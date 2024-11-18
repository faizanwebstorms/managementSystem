import { useState } from "react";
// import { useTranslation } from "react-i18next";
import {
  AiOutlineDown,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/header.css";

const Header = (props) => {
  const { toggleSidebar } = props;

  // const { i18n } = useTranslation();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  console.log("dropdownOpen", dropdownOpen);

  return (
    <header className="header">
      <div className="d-flex justify-content-between align-items-center w-100">
        <button onClick={toggleSidebar} className="menu-button">
          <AiOutlineMenu size={24} />
        </button>
        {/* <h1>{t("dashboard")}</h1> */}
        {/* <div className="language-selector me-4">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
          >
            <option value="en">English</option>
            <option value="zh">Chinese</option>
            <option value="ur">Urdu</option>
          </select>
        </div> */}
        <div className="position-relative">
          <div
            className="p-3"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            <FiUser size={30} />
            <AiOutlineDown size={20} className="dropdown-icon" />
          </div>
          {dropdownOpen && (
            <div className="dropdown-menubar">
              <ul>
                <li>
                  <Link to="/profile">
                    <AiOutlineUser size={18} /> Profile
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <AiOutlineLogout size={18} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

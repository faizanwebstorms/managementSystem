import {
  AiOutlineClose,
  AiOutlineBank,
  AiOutlineAccountBook,
  AiOutlineUser,
  // AiOutlineUser,
  // AiOutlineAccountBook,
  // AiOutlineBranches,
  // AiOutlineTeam,
  // AiOutlineUnorderedList,
  // AiOutlineSetting,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const SidebarInstitutions = (props) => {
  const { isOpen, onClose } = props;
  const location = useLocation();

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="close-btn" onClick={onClose}>
        <AiOutlineClose size={24} />
      </button>
      <nav>
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">
              <AiOutlineBank size={24} />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li className={location.pathname === "/deposit" ? "active" : ""}>
            <Link to="/deposit">
              <AiOutlineBank size={24} />
              {isOpen && <span>Deposit</span>}
            </Link>
          </li>

          <li className={location.pathname === "/withdrawl" ? "active" : ""}>
            <Link to="/withdrawl">
              <AiOutlineAccountBook size={24} />
              {isOpen && <span>Withdrawal</span>}
            </Link>
          </li>

          <li className={location.pathname === "/personnel" ? "active" : ""}>
            <Link to="/personnel">
              <AiOutlineUser size={24} />
              {isOpen && <span>Reports</span>}
            </Link>
          </li>

          <li className={location.pathname === "/personnel" ? "active" : ""}>
            <Link to="/personnel">
              <AiOutlineUser size={24} />
              {isOpen && <span>Personnel</span>}
            </Link>
          </li>

          {/* <li className={location.pathname === "/withdrawl" ? "active" : ""}>
            <Link to="/withdrawl">
              <AiOutlineAccountBook size={24} />
              {isOpen && <span>Withdrawal</span>}
            </Link>
          </li>
          <li className={location.pathname === "/personnel" ? "active" : ""}>
            <Link to="/personnel">
              <AiOutlineUser size={24} />
              {isOpen && <span>Personnel</span>}
            </Link>
          </li>
          <li
            className={
              location.pathname === "/payment-accounts" ? "active" : ""
            }
          >
            <Link to="/payment-accounts">
              <AiOutlineAccountBook size={24} />
              {isOpen && <span>Payment Accounts</span>}
            </Link>
          </li>
          <li className={location.pathname === "/dealers" ? "active" : ""}>
            <Link to="/dealers">
              <AiOutlineTeam size={24} />
              {isOpen && <span>Dealers</span>}
            </Link>
          </li>
          <li className={location.pathname === "/institutions" ? "active" : ""}>
            <Link to="/institutions">
              <AiOutlineBranches size={24} />
              {isOpen && <span>Institutions</span>}
            </Link>
          </li>
          <li
            className={
              location.pathname === "/institutions-users" ? "active" : ""
            }
          >
            <Link to="/institutions-users">
              <AiOutlineUnorderedList size={24} />
              {isOpen && <span>Institutions Users</span>}
            </Link>
          </li>
          <li className={location.pathname === "/logs" ? "active" : ""}>
            <Link to="/logs">
              <AiOutlineSetting size={24} />
              {isOpen && <span>Logs</span>}
            </Link>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarInstitutions;

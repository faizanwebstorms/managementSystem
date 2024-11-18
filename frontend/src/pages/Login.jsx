// import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../assets/css/login.css";
import { Logo, ProjectLogo } from "../utils/image";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/actions/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.user);
  const loading = useSelector((state) => state.auth?.loading);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
  });

  const handleSubmit = (values) => {
    // if (
    //   values?.email === "admin123@gmail.com" &&
    //   values?.password === "Admin@123"
    // ) {
    //   localStorage.setItem("authToken", "tokensuccess");
    //   navigate("/dashboard");
    // } else {
    //   alert("Wrong email or password");
    //   localStorage.removeItem("authToken");
    // }
    dispatch(
      loginRequest(
        values,
        () => {
          // navigate("/dashboard");
          toast.success("Login successfully");
          setToggle(true);
        },

        () => {
          // alert("failure");
          toast.error("Incorrect emial/username or password");
        }
      )
    );
  };

  useEffect(() => {
    if (toggle) {
      if (userData?.data?.user?.role === 1) {
        navigate("/dealers/dashboard");
      } else if (userData?.data?.user?.role === 2) {
        navigate("/institution/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [toggle, userData]);

  console.log("data", userData, loading);

  return (
    <>
      <div className="login-container">
        <div className="row w-100 align-items-center">
          {/* Left Side - Form Section */}
          <div className="col-md-8" style={{ padding: "0px 150px" }}>
            <div className="logo-container text-center ">
              <img src={ProjectLogo} alt="Logo" className="logo" />

              <h2 className="text-center">Welcome back!</h2>
              <p className="text-center">
                Please enter your credentials to sign in!
              </p>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              // onSubmit={(values) => {
              //   alert(JSON.stringify(values, null, 2));
              // }}
              onSubmit={handleSubmit} // Use handleSubmit here
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="mt-4">
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="admin-01@ecme.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3 text-end">
                    <a href="/" className="forgot-password">
                      Forgot password
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>

            {/* Alternative Login Options */}
            <div className="mt-4 text-center">
              <span>or continue with</span>
              <div className="social-buttons d-flex justify-content-center mt-3">
                <button className="btn btn-outline-secondary mx-2">
                  <FaGoogle />
                  Login with Google
                </button>
                <button className="btn btn-outline-secondary mx-2">
                  <FaGoogle />
                  Login with Github
                </button>
              </div>
              <p className="mt-3">
                Don’t have an account yet? <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>

          {/* Right Side - Image Section */}
          <div className="col-md-4 d-none d-md-block">
            <img
              src={Logo}
              alt="Background"
              className="w-100"
              style={{ height: "100vh" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

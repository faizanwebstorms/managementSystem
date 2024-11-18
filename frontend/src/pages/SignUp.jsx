// import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../assets/css/login.css";
import { Logo, ProjectLogo } from "../utils/image";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../redux/actions/auth";

const SignUp = () => {
  const data = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
    role: Yup.string()
      .oneOf(["manager", "dealer", "institution"], "Select a valid role")
      .required("Role is Required"),
  });

  const handleSubmit = (values) => {
    console.log("values", values);
    const data = {
      ...values,
      role:
        values?.role === "manager"
          ? 1
          : values?.role === "dealer"
          ? 2
          : values?.role === "institution"
          ? 3
          : "",
    };
    dispatch(
      signupRequest(
        data,
        () => {
          alert("success");
        },

        () => {
          alert("failure");
        }
      )
    );
  };

  console.log("dataumar", data);

  return (
    <div className="login-container">
      <div className="row w-100 align-items-center">
        {/* Left Side - Form Section */}
        <div className="col-md-8" style={{ padding: "0px 150px" }}>
          <div className="logo-container text-center ">
            <img src={ProjectLogo} alt="Logo" style={{ width: "200px" }} />
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              role: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="">
                {/* First Name Field */}
                <div className="mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Last Name Field */}
                <div className="mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-danger"
                  />
                </div>

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

                {/* Role Field */}
                <div className="mb-3 d-flex gap-2">
                  <label>Role : </label>
                  <div className="form-check">
                    <Field
                      type="radio"
                      name="role"
                      value="manager"
                      id="role-manager"
                      className="form-check-input"
                    />
                    <label htmlFor="role-manager" className="form-check-label">
                      Manager
                    </label>
                  </div>
                  <div className="form-check">
                    <Field
                      type="radio"
                      name="role"
                      value="dealer"
                      id="role-dealer"
                      className="form-check-input"
                    />
                    <label htmlFor="role-dealer" className="form-check-label">
                      Dealer
                    </label>
                  </div>
                  <div className="form-check">
                    <Field
                      type="radio"
                      name="role"
                      value="institution"
                      id="role-dealer"
                      className="form-check-input"
                    />
                    <label htmlFor="role-dealer" className="form-check-label">
                      Institition
                    </label>
                  </div>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>

          {/* Alternative Login Options */}
          <div className="mt-4 text-center">
            <span>or continue with</span>

            <p className="mt-3">
              Already have an account? <a href="/login">Log in</a>
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
  );
};

export default SignUp;

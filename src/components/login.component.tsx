import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Using useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Check if user is already logged in upon component mount
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) navigate("/profile");
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  // Handle login logic
  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    // Reset message and set loading state
    setLoading(true);
    setMessage("");

    // Make login request
    AuthService.login(username, password)
      .then(() => {
        // On success, navigate to profile
        navigate("/profile?refresh=true");
      
      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message || error.message || error.toString();
        setLoading(false);
        setMessage(resMessage);
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

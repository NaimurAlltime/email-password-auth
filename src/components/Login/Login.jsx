import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import app from "./../../firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  //  usePasswordToggle
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleLogin = (event) => {
    setError("");
    setSuccess("");

    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const logInUser = result.user;
        console.log(logInUser);
        if (!logInUser.emailVerified) {
          alert("Can not your email verified. Please email verification!");
        }
        setSuccess("User Login successful!");
        setError("");
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setSuccess("");
      });
  };

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide your email to reset password!");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email!");
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center text-primary">Please Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    ref={emailRef}
                    required
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">Password:</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={visible ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    placeholder="Enter password"
                  />
                  <span
                    onClick={() => setVisible(!visible)}
                    className="password-toggle-icon"
                  >
                    {visible ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </span>
                </div>
                <div className="form-group mt-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
              </form>
              <p className="mb-0">
                Forget Password? Please
                <button onClick={handleResetPassword} className="btn btn-link">
                  Reset Password
                </button>
              </p>
              <p>
                <small>
                  New to this website? Please
                  <Link to="/register"> Register</Link>
                </small>
              </p>
              <p className="text-danger">{error}</p>
              <p className="text-success">{success}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

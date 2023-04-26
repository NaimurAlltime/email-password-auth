import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "./../../firebase/firebase.config";
import "./Register.css";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //  usePasswordToggle
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleRegisterSubmit = (event) => {
    // 1. prevent page refresh
    event.preventDefault();

    setError("");
    setSuccess("");

    // 2. collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    console.log(email, password, name);

    // password validation with regular expression

    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one uppercase");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Please add at least two numbers");
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("Please add at least one special character");
      return;
    } else if (password.length < 6) {
      setError("Please add at least 6 characters in your password");
      return;
    }

    //3. create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        emailVerification(loggedUser);
        updateUserData(loggedUser, name);
        console.log(loggedUser);
        setError("");
        setSuccess("User has been created successfully!");
        event.target.reset();
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      });
  };

  const emailVerification = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("Please verify your email");
    });
  };

  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("User data updated!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h2 className="text-primary">Please Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input
          className="w-75 py-1 mt-3 ps-2 rounded form-control"
          type="name"
          name="name"
          id="name"
          required
          placeholder="Enter Your Name:"
        />
        <br />
        <input
          className="w-75 py-1 ps-2 rounded form-control"
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter Your Email:"
        />
        <br />
        <input
          className="w-75 py-1 ps-2 rounded form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={visible ? "text" : "password"}
          id="password"
          name="password"
          required
          placeholder="Enter Your password:"
        />
        <span
          onClick={() => setVisible(!visible)}
          className="password-toggle-icon2"
        >
          {visible ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
        </span>
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p>
        <small>
          Already have an account? Please <Link to="/login">Login</Link>{" "}
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Register;

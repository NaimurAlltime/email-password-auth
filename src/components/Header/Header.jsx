import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav>
      <ul>
        <Link to="/"> Home </Link>
        <Link to="/register"> Register </Link>
        <Link to="/register-rbs"> Register-RBS </Link>
        <Link to="/login"> Login </Link>
      </ul>
    </nav>
  );
};

export default Header;

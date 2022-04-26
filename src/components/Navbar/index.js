import React from "react";
import logo from "../../assets/Logo.svg";
import "./style.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-logo-container">
        <img alt="logo" src={logo} className="navbar-logo-image" />
      </div>
      <div className="navbar-home-plans-and-pricing">
        <a>Home</a>
        <a className="plans-pricing">Plans & Pricing</a>
        <a>FAQ's</a>
        <a>Contact us</a>
      </div>

      <div className="navbar-buttons">
        <button className="outline-button">Login</button>
        <button className="filled-button">SignUp</button>
      </div>
    </div>
  );
}

export default Navbar;

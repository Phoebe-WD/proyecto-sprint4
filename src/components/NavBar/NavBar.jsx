import React from "react";
import { useProtectedContext } from "../../context/Protected";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const { user } = useProtectedContext();
  return (
    <div className="NavBar">
      <div className="NavBar-Container">
        <div className="profile-foto">
          <Link to="/MyProfile">
            <img src={user.photoURL} alt="user-img" className="profile-img" />
          </Link>
        </div>

        <div className="nav-logo">
          <img src="./img/loguito.svg" alt="logo" className="logo-nav" />
        </div>
        <div className="nav-title">
          <img
            src="./img/logo-title.svg"
            alt="loguito-title"
            className="logo-nav-title"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

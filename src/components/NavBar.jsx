import React from "react";
import { useProtectedContext } from "../context/Protected";
import { logOut } from "../firebase/index";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useProtectedContext();
  return (
    <>
      <div className="user-profile">
        <Link to="/MyProfile">
          <img src={user.photoURL} alt="user-img" />
        </Link>
        <img src="./img/loguito.svg" alt="logo" />
        {/* <button onClick={logOut}>Log out</button> */}
        <img src="./img/logo-title.svg" alt="loguito-title" />
      </div>
    </>
  );
};

export default NavBar;

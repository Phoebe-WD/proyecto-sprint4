import React from "react";
import { useProtectedContext } from "../../context/Protected";
import { logOut } from "../../firebase/index";
import { Link } from "react-router-dom";
import "./NavBarProfile.css";

const NavBarProfile = () => {
  const { user } = useProtectedContext();
  return (
    <header className="NavBarProfile">
      <nav>
        <div className="nav-content">
          <Link to="/Home">
            <img src="./img/back.svg" alt="back-home" />
          </Link>
          <Link to="/MyProfile" className="name-profile">
            {user.displayName}
          </Link>
        </div>

        <Link to="/" className="btn-logout">
          <button onClick={logOut} className="btn-inside-logout">
            Log out{" "}
            <img
              src="./img/logout.svg"
              alt="log-out btn"
              className="btn-img-logout"
            />
          </button>
        </Link>
      </nav>
      <div className="my-profile">
        <img src={user.photoURL} alt="user-img" />
        <div className="author">
          <p className="autor-name"> {user.displayName}</p>
        </div>
      </div>
      <div className="btn-profile">
        <Link to="/MyTweets">
          <button className="posts">My Tweets</button>
        </Link>
        <Link to="/MyFavs">
          <button className="favs">Favorites</button>
        </Link>
      </div>
    </header>
  );
};

export default NavBarProfile;

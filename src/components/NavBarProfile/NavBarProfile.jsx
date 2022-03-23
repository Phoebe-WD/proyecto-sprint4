import React from "react";
import { useProtectedContext } from "../../context/Protected";
import { logOut } from "../../firebase/index";
import { Link } from "react-router-dom";

const NavBarProfile = () => {
  const { user } = useProtectedContext();
  return (
    <header className="NavBarProfile">
      <nav>
        <Link to="/Home">
          <img src="./img/back.svg" alt="back-home" />
        </Link>
        <Link to="/MyProfile">{user.displayName}</Link>

        <Link to="/">
          <button onClick={logOut}>
            Log out <img src="./img/logout.svg" alt="log-out btn" />
          </button>
        </Link>
      </nav>
      <div className="my-profile">
        <img src={user.photoURL} alt="user-img" />
        <div className="author">
          <p> {user.displayName}</p>
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

import React, { useEffect } from "react";
import { useProtectedContext } from "../context/Protected";
import { getAuth, getLoginGoogle, logOut } from "../firebase/index";

const GoogleLogin = () => {
  const [user, setUser] = useProtectedContext();
  useEffect(() => {
    getAuth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
  });
  return (
    <div className="GoogleLogin">
      {user ? (
        <>
          <div className="user-profile">
            <img src={user.photoURL} alt="user-img" />
            <p>¡Hola {user.displayName}!</p>
            <button onClick={logOut}>Log out</button>
          </div>
        </>
      ) : (
        <button className="logInGoogle" onClick={getLoginGoogle}>
          Login con Google
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;

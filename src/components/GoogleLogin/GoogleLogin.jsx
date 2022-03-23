import React, { useEffect } from "react";
import { useProtectedContext } from "../../context/Protected";
import { getAuth, getLoginGoogle } from "../../firebase/index";
import Home from "../../pages/Home/Home";

const GoogleLogin = () => {
  const { user, setUser } = useProtectedContext();
  useEffect(() => {
    getAuth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
  });
  return (
    <div className="GoogleLogin">
      {user ? (
        <Home />
      ) : (
        <button className="logInGoogle" onClick={getLoginGoogle}>
          <img src="./img/login-google.svg" alt="login-google" />
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;

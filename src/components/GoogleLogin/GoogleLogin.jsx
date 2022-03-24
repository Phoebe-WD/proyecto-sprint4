import React, { useEffect } from "react";
import { useProtectedContext } from "../../context/Protected";
import { getAuth, getLoginGoogle } from "../../firebase/index";
import Home from "../../pages/Home/Home";

const GoogleLogin = () => {
  const { user, setUser, setImg } = useProtectedContext();
  useEffect(() => {
    getAuth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);
  useEffect(() => {
    getAuth.onAuthStateChanged((img) => {
      setImg(img);
      console.log(img);
    });
  }, []);
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

import React from "react";
import { Navigate } from "react-router-dom";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import "./Login.css";
import { useProtectedContext } from "../../context/Protected";

const Login = () => {
  const { user } = useProtectedContext();

  if (user) return <Navigate to="/Home" />;
  return (
    <div className="Login">
      <div className="img-cont">
        <img src="./img/logo-big.svg" alt="devs-united logo" />
      </div>
      <div className="Login-Cont">
        <h1>WELCOME TO DEVS UNITED!</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <GoogleLogin />
        <div className="footer-login">
          &copy; 2021 Devs_United - <span>BETA</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
// import { Navigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
// import { useProtectedContext } from "../context/Protected";

const Login = () => {
  //   const [user, setUser] = useProtectedContext();

  //   if (user) return <Navigate to="/Home" />;
  return (
    <div className="Login">
      <GoogleLogin />
    </div>
  );
};

export default Login;

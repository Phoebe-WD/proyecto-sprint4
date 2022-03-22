import React from "react";
import { useProtectedContext } from "../context/Protected";
import { Navigate } from "react-router-dom";

const MyTweets = () => {
  const [user, setUser] = useProtectedContext();
  if (!user) return <Navigate to="/" />;
  console.log(user);
  return <></>;
};

export default MyTweets;

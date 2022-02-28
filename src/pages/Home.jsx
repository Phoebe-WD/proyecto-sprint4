import React from "react";
import { Navigate } from "react-router-dom";
import SendTweet from "../components/SendTweet";
import NavBar from "../components/NavBar";
import { useProtectedContext } from "../context/Protected";

const Home = () => {
  const [user, setUser] = useProtectedContext();
  if (!user) return <Navigate to="/" />;
  return (
    <div>
      <NavBar />
      <SendTweet />
    </div>
  );
};

export default Home;

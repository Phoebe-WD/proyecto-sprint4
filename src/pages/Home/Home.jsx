import React from "react";
import { Navigate } from "react-router-dom";
import SendTweet from "../../components/SendTweet/SendTweet";
import NavBar from "../../components/NavBar/NavBar";
import { useProtectedContext } from "../../context/Protected";
import "./Home.css";

const Home = () => {
  const { user } = useProtectedContext();
  if (!user) return <Navigate to="/" />;
  return (
    <div className="Home">
      <NavBar />

      <SendTweet />
    </div>
  );
};

export default Home;

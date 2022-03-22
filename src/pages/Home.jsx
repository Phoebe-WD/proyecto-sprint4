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
      <div className="sendddd">
        <img src={user.photoURL} alt="user-img" />
        <SendTweet />
      </div>
    </div>
  );
};

export default Home;

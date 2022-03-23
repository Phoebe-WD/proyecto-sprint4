import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import MyProfile from "../MyProfile/MyProfile";
import MyTweets from "../../components/MyTweets/MyTweets";
import MyFavs from "../../components/MyFavs/MyFavs";

const Signup = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/MyProfile" element={<MyProfile />} />
      <Route path="/MyFavs" element={<MyFavs />} />
      <Route path="/MyTweets" element={<MyTweets />} />
    </Routes>
  );
};

export default Signup;

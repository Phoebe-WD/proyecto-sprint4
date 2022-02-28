import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import MyProfile from "./MyProfile";
import MyTweets from "../components/MyTweets";
import MyFavs from "../components/MyFavs";

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

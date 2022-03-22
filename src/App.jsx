import React from "react";
import "./App.css";
import SendTweet from "./components/SendTweet";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="App">
      <Signup />
      {/* <Login /> */}
      {/* <SendTweet /> */}
    </div>
  );
};

export default App;

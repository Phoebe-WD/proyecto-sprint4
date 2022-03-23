import React from "react";
import "./App.css";
import SendTweet from "./components/SendTweet/SendTweet";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";

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

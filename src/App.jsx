import React from "react";
import "./App.css";
import SendTweet from "./components/SendTweet";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      <Login />
      <SendTweet />
    </div>
  );
};

export default App;

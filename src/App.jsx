import React, { useEffect, useState } from "react";
import "./App.css";
import { getFirestore } from "./firebase/index";

function App() {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const getTweets = getFirestore;
    getTweets
      .collection("Tweet")
      .get()
      .then((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            tweet: doc.data().tweet,
            autor: doc.data().autor,
            id: doc.id,
          };
        });
        setTweets(tweets);
      });
  }, []);

  // const handleTweetChange = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="App">
      {/* <form className="form-tweet">
        <textarea
          cols="30"
          rows="5"
          onChange={handleTweetChange}
          value={tweets.tweet}
          placeholder="Escribe un tweet..."
        ></textarea>
      </form> */}
      {tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <h1>{tweet.tweet}</h1>
            <h4>por: {tweet.autor}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default App;

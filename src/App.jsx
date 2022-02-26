import React, { useEffect, useState } from "react";
import "./App.css";
import { getFirestore } from "./firebase/index";

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
  });
  useEffect(() => {
    const getTweets = getFirestore;
    getTweets.collection("Tweet").onSnapshot((snapshot) => {
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
  const sendTweet = (e) => {
    e.preventDefault();
    let enviarTweet = getFirestore.collection("Tweet").add(tweet);
    let askPermiso = enviarTweet.then((docRef) => {
      return docRef.get();
    });
    askPermiso.then((doc) => {
      let nuevoTweet = {
        tweet: doc.data().tweet,
        autor: doc.data().autor,
        id: doc.id,
      };
      setTweets([nuevoTweet, ...tweets]);
    });
  };
  const deleteTweet = (id) => {
    const nuevosTweets = tweets.filter((tweet) => {
      return tweet.id !== id;
    });
    setTweets(nuevosTweets);
    getFirestore.doc(`Tweet/${id}`).delete();
  };
  const handleChange = (e) => {
    let newTweet = {
      ...tweet,
      [e.target.name]: e.target.value,
    };
    setTweet(newTweet);
  };
  console.log(tweet);
  return (
    <div className="App">
      <form className="form-tweet">
        <textarea
          cols="30"
          rows="5"
          name="tweet"
          onChange={handleChange}
          value={tweet.tweet}
          placeholder="Escribe un tweet..."
        ></textarea>
        <input
          type="text"
          name="autor"
          id="autor"
          value={tweet.autor}
          onChange={handleChange}
        />
        <input type="submit" value="Publicar Tweet" onClick={sendTweet} />
      </form>
      <h1>Tweets:</h1>
      {tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <span className="deleteTweet" onClick={() => deleteTweet(tweet.id)}>
              <i class="fa-solid fa-trash-can"></i>
            </span>
            <h1>{tweet.tweet}</h1>
            <h4>por: {tweet.autor}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default App;

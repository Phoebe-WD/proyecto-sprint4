import React, { useState } from "react";
import { useProtectedContext } from "../context/Protected";
import { getFirestore } from "../firebase";
import Tweets from "./Tweets";

const SendTweet = () => {
  const [user, setUser] = useProtectedContext();
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
  });
  const handleChange = (e) => {
    let newTweet = {
      // ...tweet,
      // [e.target.name]: e.target.value,
      tweet: e.target.value,
      uid: user.uid,
      email: user.email,
      autor: user.displayName,
      likedBy: [],
    };
    setTweet(newTweet);
  };
  const sendTweet = (e) => {
    e.preventDefault();
    const enviarTweet = getFirestore.collection("Tweet").add(tweet);
    let askPermiso = enviarTweet.then((docRef) => {
      return docRef.get();
    });
    askPermiso.then((doc) => {
      let nuevoTweet = {
        tweet: doc.data().tweet,
        autor: doc.data().autor,
        id: doc.id,
        likes: doc.data().likes,
        email: doc.data().email,
        uid: doc.data().uid,
      };
      setTweets([nuevoTweet, ...tweets]);
    });
  };
  return (
    <>
      <form className="form-tweet">
        <textarea
          cols="30"
          rows="5"
          name="tweet"
          onChange={handleChange}
          value={tweet.tweet}
          placeholder="Escribe un tweet..."
        ></textarea>
        <input type="submit" value="Publicar Tweet" onClick={sendTweet} />
      </form>
      <Tweets
        tweets={tweets}
        setTweets={setTweets}
        tweet={tweet}
        setTweet={setTweet}
        user={user}
        setUser={setUser}
      />
    </>
  );
};

export default SendTweet;

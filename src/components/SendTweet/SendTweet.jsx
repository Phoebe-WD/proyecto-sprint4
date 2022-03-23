import React, { useState } from "react";
import { useProtectedContext } from "../../context/Protected";
import { getFirestore } from "../../firebase";
import Tweets from "../Tweets/Tweets";
import "./SendTweet.css";

const SendTweet = () => {
  const { user, setUser, setTweets, tweets } = useProtectedContext();
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
  });

  const handleChange = (e) => {
    let newTweet = {
      dateCreation: new Date(),
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
        likedBy: doc.data().likedBy,
        dateCreation: doc.data().dateCreation,
      };
      setTweets([nuevoTweet, ...tweets]);
    });
  };
  return (
    <div className="SendTweet">
      <div className="sendtwettcont">
        <div className="Post-Container">
          <div className="Post-img">
            <img src={user.photoURL} alt="user-img" />
          </div>
          <form className="form-tweet">
            <textarea
              cols="30"
              rows="5"
              name="tweet"
              maxLength="200"
              onChange={handleChange}
              value={tweet.tweet}
              placeholder="What's happening?"
            ></textarea>
            <input type="submit" value="POST" onClick={sendTweet} />
          </form>
        </div>
      </div>
      <Tweets
        tweets={tweets}
        setTweets={setTweets}
        tweet={tweet}
        setTweet={setTweet}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default SendTweet;

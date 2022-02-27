import React, { useEffect, useState } from "react";
import "./App.css";
import {
  getFirestore,
  getLoginGoogle,
  getAuth,
  logOut,
} from "./firebase/index";

const App = () => {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getTweets = getFirestore;
    getTweets.collection("Tweet").onSnapshot((snapshot) => {
      const tweets = snapshot.docs.map((doc) => {
        return {
          tweet: doc.data().tweet,
          autor: doc.data().autor,
          id: doc.id,
          likes: doc.data().likes,
          email: doc.data().email,
          uid: doc.data().uid,
          likedBy: doc.data().likedBy,
        };
      });
      console.log(tweets);
      setTweets(tweets);
    });
    getAuth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => getTweets();
  }, []);
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
  const deleteTweet = (id) => {
    const nuevosTweets = tweets.filter((tweet) => {
      return tweet.id !== id;
    });
    setTweets(nuevosTweets);
    getFirestore.doc(`Tweet/${id}`).delete();
  };

  const likeTweet = (id, uid, likedBy, likes) => {
    // if (!likes) likes = 0;
    // getFirestore.doc(`Tweet/${id}`).update({ likes: likes + 1 });
    let newLikedBy = [...likedBy, uid];
    getFirestore.doc(`Tweet/${id}`).update({ likedBy: newLikedBy });
  };

  const dislikeTweet = (id, uid, likedBy) => {
    const newLikedBy = likedBy.filter((userUid) => uid !== userUid);
    getFirestore.doc(`Tweet/${id}`).update({ likedBy: newLikedBy });
  };

  const showLikes = (listLikes, likes, id) => {
    console.log(listLikes);
    if (listLikes && user) {
      const youLike = listLikes.findIndex((likero) => user.uid === likero);
      // no tiene like
      if (youLike < 0) {
        return (
          <>
            <span onClick={() => likeTweet(listLikes, id, user.uid, likes)}>
              <img src="./img/heart-red.svg" alt="like" />{" "}
              <span>{listLikes.length}</span>
            </span>
          </>
        );
      } else {
        // ya le dio like
        return (
          <>
            <span
              onClick={() => dislikeTweet(listLikes, id, user.uid, likes)}
              className="dislike"
            >
              <img src="./img/heart-red.svg" alt="like" />
              <span>{listLikes.length}</span>
            </span>
          </>
        );
      }
    } else {
      return (
        <>
          <span
            onClick={() => likeTweet(listLikes, id, user.uid, likes)}
            className="like"
          >
            <img src="./img/heart-red.svg" alt="like" />
            <span>{likes ? likes : 0}</span>
          </span>
        </>
      );
    }
  };
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
  console.log(tweet);
  return (
    <div className="App">
      {user ? (
        <>
          <div className="user-profile">
            <img src={user.photoURL} alt="user-img" />
            <p>¡Hola {user.displayName}!</p>
            <button onClick={logOut}>Log out</button>
          </div>
        </>
      ) : (
        <button className="logInGoogle" onClick={getLoginGoogle}>
          Login con Google
        </button>
      )}
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
      <h1>Tweets:</h1>
      {tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <span className="deleteTweet" onClick={() => deleteTweet(tweet.id)}>
              <i className="fa-solid fa-trash-can"></i>
            </span>
            <h1>{tweet.tweet}</h1>
            <h4>por: {tweet.autor}</h4>
            <h4>{tweet.email}</h4>
            {/* <span onClick={() => likeTweet(tweet.id, tweet.likes)}>
              <img src="./img/heart-red.svg" alt="like" />{" "}
              <span>{tweet.likes ? tweet.likes : 0}</span>
            </span> */}
            {showLikes(tweet.likedBy, tweet.id, tweet.likes)}
          </div>
        );
      })}
    </div>
  );
};

export default App;

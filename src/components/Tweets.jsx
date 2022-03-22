import React, { useEffect } from "react";
import { getFirestore } from "../firebase";

const Tweets = ({ tweets, setTweets, tweet, setTweet, user, setUser }) => {
  useEffect(() => {
    const getTweets = getFirestore
      .collection("Tweet")
      .orderBy("dateCreation", "desc")
      .onSnapshot(
        (snapshot) => {
          const tweets = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              tweet: data.tweet,
              autor: data.autor,
              id: doc.id,
              likes: data.likes,
              email: data.email,
              uid: data.uid,
              likedBy: data.likedBy,
              dateCreation: data.dateCreation,
            };
          });
          console.log("onSnap", tweets);
          setTweets(tweets);
        },
        (err) => console.log(err, "error on")
      );
    return () => getTweets();
  }, []);

  const deleteTweet = (id) => {
    const nuevosTweets = tweets.filter((tweet) => {
      return tweet.id !== id;
    });
    setTweets(nuevosTweets);
    getFirestore.doc(`Tweet/${id}`).delete();
  };

  const likeTweet = (id, likedBy, likes) => {
    console.log("el uid", user.uid);
    let newLikedBy = [...likedBy, user.uid];
    getFirestore
      .collection("Tweet")
      .doc(id)
      .set({ likedBy: newLikedBy }, { merge: true })
      .then(() => console.log("success"))
      .catch((err) => console.log(err, "error"));
  };

  const dislikeTweet = (id, likedBy) => {
    const newLikedBy = likedBy.filter((userUid) => user.uid !== userUid);
    getFirestore
      .collection("Tweet")
      .doc(id)
      .set({ likedBy: newLikedBy }, { merge: true })
      .then(() => console.log("success"))
      .catch((err) => console.log(err, "error"));
  };

  const showLikes = (listLikes, id, likedBy) => {
    const youLike = listLikes?.some((likero) => user?.uid === likero);
    if ((Array.isArray(listLikes) && listLikes.length === 0) || !youLike) {
      return (
        <>
          <span onClick={() => likeTweet(id, listLikes)}>
            <img src="./img/heart-white.svg" alt="like" />{" "}
            <span>{listLikes?.length}</span>
          </span>
        </>
      );
    }
    return (
      <>
        <span onClick={() => dislikeTweet(id, listLikes)} className="dislike">
          <img src="./img/heart-red.svg" alt="like" />
          <span>{listLikes?.length}</span>
        </span>
      </>
    );
  };
  return (
    <>
      <h2>Tweets:</h2>
      {tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            {user?.uid === tweet.uid && (
              <span
                className="deleteTweet"
                onClick={() => deleteTweet(tweet.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </span>
            )}
            <h1>{tweet.id}</h1>
            {/* <h2>{tweet.uid}</h2> */}
            <h1>{tweet.tweet}</h1>
            <h4>por: {tweet.autor}</h4>
            <h4>{tweet.email}</h4>
            {showLikes(tweet.likedBy, tweet.id, tweet.likes)}
          </div>
        );
      })}
    </>
  );
};

export default Tweets;

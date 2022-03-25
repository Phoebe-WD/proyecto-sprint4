import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore } from "../firebase/index";

const Context = createContext();

export const useProtectedContext = () => useContext(Context);

const ProtectedContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [tweets, setTweets] = useState([]);
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
              email: data.email,
              uid: data.uid,
              likedBy: data.likedBy,
              dateCreation: data.dateCreation,
              img: data.img,
            };
          });
          // console.log("onSnap", tweets);
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

  const likeTweet = (id, likedBy) => {
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
          <span
            onClick={() => likeTweet(id, listLikes)}
            className="container-like"
          >
            <img src="./img/heart-white.svg" alt="like" />{" "}
            <span className="count-likes">{listLikes.length}</span>
          </span>
        </>
      );
    }
    return (
      <>
        <span
          onClick={() => dislikeTweet(id, listLikes)}
          className="container-like"
        >
          <img src="./img/heart-red.svg" alt="like" />
          <span className="count-likes">{listLikes.length}</span>
        </span>
      </>
    );
  };
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        showLikes,
        setTweets,
        tweets,
        deleteTweet,
        img,
        setImg,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ProtectedContext;

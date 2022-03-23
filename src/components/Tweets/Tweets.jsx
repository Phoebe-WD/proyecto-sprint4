import React from "react";
// import { getFirestore } from "../firebase";
import { useProtectedContext } from "../../context/Protected";

const Tweets = ({ tweet, setTweet }) => {
  const { deleteTweet, tweets, showLikes, user } = useProtectedContext();

  return (
    <div className="Tweets">
      <h2>Tweets:</h2>
      {tweets &&
        tweets.map((tweet) => {
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
    </div>
  );
};

export default Tweets;

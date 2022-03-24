import React from "react";
// import { getFirestore } from "../firebase";
import { useProtectedContext } from "../../context/Protected";
import "./Tweets.css";

const Tweets = ({ tweet, setTweet }) => {
  const { deleteTweet, tweets, showLikes, user } = useProtectedContext();

  return (
    <div className="Tweets">
      {tweets &&
        tweets.map((tweet) => {
          return (
            <div key={tweet.id} className="Tweet-Content">
              <div className="Tweet-autor">
                <div className="tweet-img-autor">
                  <img src={tweet.img} alt="user-img" />
                </div>
                <div className="tweet-autor-name">
                  <h4> {tweet.autor}</h4>
                </div>
                {user?.uid === tweet.uid && (
                  <div className="tweet-trash">
                    <span
                      className="deleteTweet"
                      onClick={() => deleteTweet(tweet.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                  </div>
                )}
              </div>

              <p>{tweet.tweet}</p>
              <div className="likes">{showLikes(tweet.likedBy, tweet.id)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Tweets;

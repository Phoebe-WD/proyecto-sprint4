import React from "react";
import { useProtectedContext } from "../../context/Protected";
import { Navigate } from "react-router-dom";
import NavBarProfile from "../NavBarProfile/NavBarProfile";
import "./MyFavs.css";

const MyFavs = () => {
  const { deleteTweet, tweets, showLikes, user } = useProtectedContext();
  if (!user) return <Navigate to="/" />;
  return (
    <div className="MyFavs">
      <NavBarProfile />
      {tweets &&
        tweets.map((tweet) => {
          const fav = tweet.likedBy.findIndex((like) => user.uid === like);
          {
            if (fav >= 0) {
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

                  <p className="tweet-text">{tweet.tweet}</p>
                  <div className="likes">
                    {showLikes(tweet.likedBy, tweet.id)}
                  </div>
                </div>
              );
            }
          }
        })}
    </div>
  );
};

export default MyFavs;

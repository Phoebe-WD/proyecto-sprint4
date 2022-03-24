import React from "react";
import { useProtectedContext } from "../../context/Protected";
import { Navigate } from "react-router-dom";
import NavBarProfile from "../NavBarProfile/NavBarProfile";

const MyFavs = () => {
  const { deleteTweet, tweets, showLikes, user } = useProtectedContext();
  if (!user) return <Navigate to="/" />;
  return (
    <div className="MyFavs">
      <NavBarProfile />
      <h2>My Tweets Favorites:</h2>
      {tweets &&
        tweets.map((tweet) => {
          const fav = tweet.likedBy.findIndex((like) => user.uid === like);
          {
            if (fav >= 0) {
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
                  <img src={tweet.img} alt="user-img" />
                  <h1>{tweet.tweet}</h1>
                  <h4>por: {tweet.autor}</h4>
                  <h4>{tweet.email}</h4>
                  {showLikes(tweet.likedBy, tweet.id)}
                </div>
              );
            }
          }
        })}
    </div>
  );
};

export default MyFavs;

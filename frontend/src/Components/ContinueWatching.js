import React from "react";
import { FaPlay } from "react-icons/fa"; // Import play icon
import "../css/CW.css";

const ContinueWatching = () => {
  const movies = [
    {
      title: "Predestination",
      episode: "Episode 3",
      image: "data:image/jpeg;base64,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",
    },
    {
      title: "Snowpiercer",
      episode: "Episode 7",
      image: "https://images.cds.amcn.com/amcn/tve/Snowpiercer_S4_Web_Desktop_Mobile_Swimlane_1280x720.jpg",
    },
    {
      title: "Chernobyl",
      episode: "55min 12sec",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADgAJQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAABAMGAgUHAf/EACoQAAICAQIFAwQDAQAAAAAAAAECAxEABCEFEjFBURMikQZhcfChseEy/8QAFwEBAQEBAAAAAAAAAAAAAAAAAgEDAP/EABgRAQADAQAAAAAAAAAAAAAAAAABAhEx/9oADAMBAAIRAxEAPwC3LGAOmeSJYx/T6T1lQhqLNyjY/bqe3XGF4Uz8g9VLcX57XgDFdkWshdbBzdajhUhEZEiBZKCkAnc8tdOm7fu2Ky8LkjA5tRF7kV6APcgV8lfnKmKdJEQxvz5wyfUxmKZ07qxB+c9ysV0idgtKxAu6ByPW6iaKIBHcD7Mdsx08yOgK4pxDWMshRaqu4wtiz6iUWVlcE7WGP72GYGVyPdIxoAC27eMgeTmP58ZmiMVJrKMtbqizylpGZmJ3LGycMimMjuaF0c8ysm+0sxaIBA1k1t3ynfXUPGVXTzaVpV011IY3ZSh8tRFivJG4++bjRa0leaJzRP8AWJfUesD8D1vqm0VAQD5BBH8gZI6cW0t9O/USzcRj4XNcjyBgssp9wPKSBSgA9D/uWz1wiMBuCoZRfSxnHOD6ljx/QamIASLqkIHOBzC6PXboTnT0mLxu5HLvQBINAfj73isvEUk/uNL3wxSWVVb3Mo/JwwBpDQyJGYeUluRWFLvdnbGeIaGXiPD3gRvQVv8Aoul2PFX5rDDK6OucaRHj1GkCiysyEEebzpWmOoWMrLGAB0IN38YYZbHclxCB5mTlRmq72wwwwsn/2Q==",
    },
  ];

  return (
    <div className="continue-watching">
      <h3>Popular</h3>
      {movies.map((movie, index) => (
        <div key={index} className="movie-item">
          <img src={movie.image} alt={movie.title} />
          <div className="movie-details">
            <p>{movie.title}</p>
          </div>
          <FaPlay className="play-icon" /> 
        </div>
      ))}
    </div>
  );
};

export default ContinueWatching;
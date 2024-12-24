import React from "react";
import { useQuery, gql } from "@apollo/client";
import "../css/Suggestion.css";
import Card from "./Card";
import { GET_MOVIES } from "../gql/query";
const Suggestions = () => {
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { cursor: null, limit: 5 },
  });

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="suggestions">
      <h3>You Might Like</h3>
      <div className="suggestions-grid">
        {data?.movieFeed?.Movies?.length>0?( data.movieFeed.Movies.map((movie) => (
          <Card
            key={movie.id}
            movieId={movie.id}
            imgsrc={movie.imgsrc}
            title={movie.title}
            description={movie.description}
            genre={movie.genre}
            releaseDate={movie.releaseDate}
            rating={movie.rating}
            favoriteCount={movie.favoriteCount}
            me={data?.me}
          />
        ))):(<p>No moviews found</p>)}
      </div>
    </div>
  );
};

export default Suggestions;

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../gql/query";
import Header from "../Components/Header";
import Card from "../Components/Card"; 

const Explore = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { limit: 25, cursor: null }
  });

  const handleSearch = (searchTerm) => {
    if (!data?.movieFeed?.Movies) return;
    
    const filtered = data.movieFeed.Movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  return (
    <>
      <Header onSearch={handleSearch} currentPage="Explore" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
      }}>
        {(filteredMovies.length > 0 ? filteredMovies : data.movieFeed.Movies)?.map((movie) => (
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
        ))}
      </div>
    </>
  );
};

export default Explore;

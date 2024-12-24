import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/query';
import { GET_MY_MOVIES } from '../gql/query';
import Card from '../Components/Card';
import DeleteMovie from '../Components/DeleteMovie';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const MyMovies = () => {
  const navigate = useNavigate();
  const [filteredMovies, setFilteredMovies] = useState([]);
  useEffect(() => {
    document.title = 'My Movies — MovieApp';
  }, []);

  const { data: authData } = useQuery(IS_LOGGED_IN);
  const { loading, error, data } = useQuery(GET_MY_MOVIES);

  const handleSearch = (searchTerm) => {
    if (!data?.me?.Movies) return;
    
    const filtered = data.me.Movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  if (!authData?.isLoggedIn) {
    return <p>Please log in to view your movies.</p>;
  }

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong!</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  // Check for Movies instead of movies
  if (!data?.me?.Movies || data.me.Movies.length === 0) {
    return (
      <div>
        <p>No movies added yet.</p>
        <button onClick={() => navigate('/NewMovie')}>Add a Movie</button>
      </div>
    );
  }

  return (
    <>
      <Header onSearch={handleSearch} currentPage="My Movies" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {(filteredMovies.length ? filteredMovies : data?.me?.Movies)?.map((movie) => (
          <div key={movie.id} style={{ position: 'relative' }}>
            <Card
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
            <DeleteMovie movieId={movie.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyMovies;

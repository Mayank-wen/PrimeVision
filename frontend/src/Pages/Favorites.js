import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_FAVORITES, IS_LOGGED_IN } from '../gql/query';
import Card from '../Components/Card';
import Header from '../Components/Header';

const Favorites = () => {
  useEffect(() => {
    document.title = 'My Favorites';
  }, []);
  
  const { data: authData } = useQuery(IS_LOGGED_IN);
  const { loading, error, data } = useQuery(GET_MY_FAVORITES, {
    skip: !authData?.isLoggedIn,
    fetchPolicy: 'network-only' 
  });
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  
  const handleSearch = (searchTerm) => {
    if (!data?.me?.favorites) return;
    
    const filtered = data.me.favorites.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  };

  console.log('Is logged in:', authData?.isLoggedIn);
  if (!authData?.isLoggedIn) {
    return <p>Please log in first</p>;
  }
  
  if (loading) return 'Loading...';
  if (error) {
    console.error('Favorites error:', error);
    return `Error! ${error.message}`;
  }
  
  const favorites = data?.me?.favorites || [];

  return (
    <>
      <Header onSearch={handleSearch} currentPage="Favorites" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '20px',
      }}>
        {(filteredFavorites.length > 0 ? filteredFavorites : favorites).map(movie => (
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
            me={data.me}
          />
        ))}
      </div>
    </>
  );
};

export default Favorites;
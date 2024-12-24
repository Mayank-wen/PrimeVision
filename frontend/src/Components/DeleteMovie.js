import React from 'react';
import { useMutation } from '@apollo/client';
import Button from './Button'; 
import { DELETE_MOVIE, GET_MY_MOVIES } from '../gql/query'; 
const DeleteMovie = ({ movieId }) => {
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    variables: { id: movieId },
    refetchQueries: [{ query: GET_MY_MOVIES }],
    onError: (error) => {
      console.error('Error deleting movie:', error);
      alert('Failed to delete movie: ' + error.message);
    },
    onCompleted: () => {
      alert('Movie deleted successfully');
    }
  });

  const handleDelete = async () => {
    try {
      await deleteMovie();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return <Button onClick={handleDelete} />;
};

export default DeleteMovie;

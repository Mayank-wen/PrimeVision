import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import MovieForm from "../Components/MovieForm";
const GET_CURRENT_USER = gql`
  query me {
    me {
      id
      username
    }
  }
`;
const NEW_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $genre: String!
    $imgsrc: String!
    $rating: String!
    $releaseDate: String!
    $description: String!
  ) {
    addMovie(
      title: $title
      genre: $genre
      imgsrc: $imgsrc
      rating: $rating
      releaseDate: $releaseDate
      description: $description
    ) {
      id
      title
      genre
      imgsrc
      rating
      releaseDate
      description
      author {
        id
        username
      }
    }
  }
`;

const NewMovie = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const [addMovie, { loading: movieLoading, error: movieError }] = useMutation(
    NEW_MOVIE,
    {
      onCompleted: () => {
        navigate("/MyMovies");
      },
      refetchQueries: ["GetMyMovies"],
      onError: (error) => {
        console.error("Error adding movie:", error);
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user data</p>;

  const userId = data.me.id;
    console.log(userId)
  if (!userId) {
    navigate("/login");
    return <p>You need to log in to add a movie.</p>;
  }

  return (
    <React.Fragment>
      {movieLoading && <p>Saving movie...</p>}
      {movieError && <p>Error saving the movie: {movieError.message}</p>}
      <MovieForm
        action={(variables) =>
          addMovie({
            variables: {
              ...variables,
              rating: variables.rating.toString(),
              authorId: userId,
            },
          })
        }
      />
    </React.Fragment>
  );
};

export default NewMovie;

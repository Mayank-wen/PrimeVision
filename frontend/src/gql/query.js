import { gql } from "@apollo/client";
const GET_MOVIES = gql`
  query movieFeed($cursor: String, $limit: Int) {
    movieFeed(cursor: $cursor, limit: $limit) {
      Movies {
        id
        title
        genre
        imgsrc
        rating
        releaseDate
        description
        favoriteCount
        createdAt
        author {
          id
          username
        }
      }
      cursor
      hasNextPage
    }
  }
`;
const GET_MOVIE = gql`
  query getMovieById($id: ID!) {
    getMovieById(id: $id) {
      id
      title
      genre
      imgsrc
      rating
      releaseDate
      description
      favoriteCount
      createdAt
      author {
        id
        username
      }
    }
  }
`;
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;
const GET_MY_MOVIES = gql`
  query {
    me {
      Movies {
        id
        title
        genre
        imgsrc
        rating
        description
        favoriteCount
        createdAt
        releaseDate
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;
const GET_MY_FAVORITES = gql`
  query {
    me {
      id
      username
      favorites {
        id
        title
        imgsrc
        description
        releaseDate
        genre
        rating
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`;
const GET_ME = gql`
  query me {
    me {
      id
      username
      favorites {
        id
      }
    }
  }
`;
const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id)
  }
`;
export {
  GET_MY_FAVORITES,
  GET_MOVIES,
  GET_MOVIE,
  IS_LOGGED_IN,
  TOGGLE_FAVORITE,
  GET_ME,
  GET_MY_MOVIES,
  DELETE_MOVIE,
};

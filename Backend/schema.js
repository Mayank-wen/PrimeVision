const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  type Movie {
    id: ID!
    title: String!
    genre: String!
    imgsrc: String!
    rating: Float!
    releaseDate: String!
    description: String!
    favoritedBy: [User!]
    favoriteCount: Int!
    createdAt: String!
    author: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    Movies: [Movie!]!
    favorites: [Movie!]!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    addMovie(
    title: String!
    genre: String!
    imgsrc: String!
    rating: String!
    releaseDate: String!
    description: String!
  ): Movie!
    deleteMovie(id: ID!): String!
    signIn(username: String, email: String, password: String!): String!
    toggleFavorite(id: ID!): Movie!
  }

  type Query {
    getMovies: [Movie!]
    getMovieById(id: ID!): Movie
    user(username: String!): User
    users: [User!]!
    me: User!
    movieFeed(cursor: String,limit:Int): MovieFeedResponse!
     isLoggedIn: Boolean!
  }

  type MovieFeedResponse {
    Movies: [Movie!]!
    cursor: String
    hasNextPage: Boolean!
  }
`;

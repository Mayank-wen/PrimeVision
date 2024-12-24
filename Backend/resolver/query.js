const User = require("../models/user");
module.exports = {
  isLoggedIn: (parent, args, context) => {
    return !!context.user;  
  },
  me: async (parent, args, { models,user }) => {
    if (!user) {
      throw new Error("Not authenticated");
    }
    return await User.findById(user.id);
  },
  getMovies: async (parent, args, { models }) => {
    return await models.Movie.find().limit(100);
  },
  getMovieById: async (parent, { id }, { models }) => {
    return await models.Movie.findById(id);
  },
  movieFeed: async (parent, { cursor, limit = 10 }, { models }) => {
    let hasNextPage = false;
    let cursorQuery = {};
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }
    let movies = await models.Movie.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);
  
    if (movies.length > limit) {
      hasNextPage = true;
      movies = movies.slice(0, -1); 
    }
    const newCursor = movies.length > 0 ? movies[movies.length - 1]._id : null;
    return {
      Movies: movies || [],
      cursor: newCursor,
      hasNextPage,
    };
  },
  
};

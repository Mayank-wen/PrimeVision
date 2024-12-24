const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
require("dotenv").config();
const gravatar = require("../utils/gravatar");

module.exports = {
  addMovie: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to add a movie");
    }

    try {
      console.log("User ID:", user.id);
      const movie = await models.Movie.create({
        title: args.title,
        genre: args.genre,
        imgsrc: args.imgsrc,
        rating: args.rating,
        releaseDate: args.releaseDate,
        description: args.description,
        author: user.id, 
      });
      const populatedMovie = await movie.populate("author");
      console.log("Populated movie:", populatedMovie);
      return populatedMovie;
    } catch (error) {
      console.error("Error adding movie:", error.message);
      console.error("Error stack trace:", error.stack);
      throw new Error("Failed to add movie. Please try again later.");
    }
  },
   signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) {
      throw new AuthenticationError("Error signing in");
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AuthenticationError("Error signing in");
    }
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    // Normalize email
    email = email.trim().toLowerCase();
    
    // Hash the password
    const hashed = await bcrypt.hash(password, 10);
    
    try {
      const user = await models.User.create({
        username,
        email,
        password: hashed
      });
      
      // Create and return json web token
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Error creating account');
    }
  },
  deleteMovie: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to delete a movie");
    }
    try {
      const movie = await models.Movie.findById(id);
      if (!movie) {
        throw new Error("Movie not found");
      }
      if (String(movie.author) !== user.id) {
        throw new ForbiddenError("You are not authorized to delete this movie");
      }
      await models.Movie.findByIdAndDelete(id);
      return `Movie with id: ${id} deleted successfully.`;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw new Error("Failed to delete movie");
    }
  },

  toggleFavorite: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError();
    }
    let MovieCheck = await models.Movie.findById(id);
    const hasUser = MovieCheck.favoritedBy.indexOf(user.id);
    if (hasUser >= 0) {
      return await models.Movie.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: new mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: -1,
          },
        },
        {
          new: true,
        }
      );
    } else {
      return await models.Movie.findByIdAndUpdate(
        id,
        {
          $push: { favoritedBy: new mongoose.Types.ObjectId(user.id) },
          $inc: { favoriteCount: 1 },
        },
        { new: true }
      );
    }
  },
};

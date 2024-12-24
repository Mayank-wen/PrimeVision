const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  imgsrc: {
    type: String,
    required: true,
    default:
      "https://images.pexels.com/photos/2346001/pexels-photo-2346001.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  rating: { type: String, required: true },
  releaseDate: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  favoriteCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;

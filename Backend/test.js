require('dotenv').config();
const mongoose = require('mongoose');

const uri = "mongodb+srv://Mayank_Kush:Mayank@1734@cluster0.1rghv.mongodb.net/MOVIE_APP?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

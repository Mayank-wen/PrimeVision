const mongoose =require("mongoose")
const userschema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        index: { unique: true },
      },
      email: {
        type: String,
        required: true,
        index: { unique: true },
      },
      password: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        default:"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    },
    { timestamps: true }
  );
  
const User =mongoose.model('User',userschema);
module.exports=User
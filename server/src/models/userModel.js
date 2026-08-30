const mongoose = require("mongoose");
const PastGameSchema = require("./pastGameModel");

const userSchema = new mongoose.Schema(
    {
        email: { 
            type: String, 
            required: true, 
            unique: true 
        },
        username: { 
            type: String, 
            required: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        bio: String,
        streak: Number, 
        past_games: [PastGameSchema]
    },
    { _id: true }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
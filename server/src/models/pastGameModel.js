const mongoose = require("mongoose");

const pastGameSchema = new mongoose.Schema(
    {
        word: String,
        guessed_words: [String], 
        date: {
            type: Date, 
            default: Date.now
        }
    }, 
    {_id: true}
);

const PastGame = mongoose.model("PastGame", pastGameSchema, "past_games");

module.exports = PastGame; 
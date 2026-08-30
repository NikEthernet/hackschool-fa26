const Game = require("../models/gameModel");

const getGames = async () => {
    const games = Game.find().sort({ createdAt: -1 });
    return games;
};

const getGameToday = async () => {
    const game = Game.find().
        sort({ createdAt: -1 }).
        limit(1);
    return game;
};

const getSpecificGame = async (date) => {
    const game = Game.findOne({ date });
    return game;
};

module.exports = { getGames, getGameToday, getSpecificGame };
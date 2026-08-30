const express = require("express");
const { getGames, getGameToday, getSpecificGame } = require("../controllers/game.controller");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const games = await getGames();
        res.json(games);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/daily", async (req, res) => {
    try {
        const game = await getGameToday();
        res.json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:date", async (req, res) => {
    try {
        const game = await getSpecificGame(req.params.date);
        res.json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
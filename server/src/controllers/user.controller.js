const User = require("../models/userModel");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: "Username and password are required." });

        const user = await User.findOne({ username });
        if (!user || user.password !== password)
            return res.status(401).json({ error: "Invalid username or password." });

        // Remove the password before sending the user back
        const { password: _removed, ...safeUser } = user.toObject();
        res.json(safeUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find();
    if (users.length === 0)
        return res.status(404).json({ error: "Users not found." });
    res.json(users);
};

const getUserByName = async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found." });
    res.json(user)
};

const getRecentUsers = async (req, res) => {
    const users = await User.find().
        sort({ created_at: -1 }).
        limit(10);
    if (users.length === 0)
        return res.status(404).json({ error: "Users not found." });
    res.json(users);
};

const createUser = async (req, res) => {
    const { email, username, password, bio } = req.body;

    if (!email || !username || !password)
        return res.status(400).json({ error: "Email, username, and password are required." });

    try {
        if (await User.findOne({ username }))
            return res.status(409).json({ error: "That username is already taken." });

        const user = await User.create({ email, username, password, bio });
        const { password: _removed, ...safeUser } = user.toObject();
        res.status(201).json(safeUser);
    } catch (err) {
        if (err.code === 11000)
            return res.status(409).json({ error: "That email is already in use." });
        res.status(400).json({ error: err.message });
    }
};

const addPastGame = async (req, res) => {
    try {
        const { word, guessed_words } = req.body;

        if (!word || !Array.isArray(guessed_words) || guessed_words.length === 0)
            return res.status(400).json({ error: "word and guessed_words are required." });

        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ error: "User not found." });

        // A win means the last guess was the word. The server works this out
        // itself instead of trusting a "won" flag from the browser.
        const won =
            guessed_words[guessed_words.length - 1].toUpperCase() === word.toUpperCase();

        user.past_games.push({ word, guessed_words, date: new Date() });
        user.streak = won ? user.streak + 1 : 0;

        await user.save();

        res.status(201).json({ game: user.past_games.at(-1), streak: user.streak });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    login,
    getUsers,
    getUserByName,
    getRecentUsers,
    createUser,
    addPastGame
}; 
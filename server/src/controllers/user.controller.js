const User = require("../models/userModel");

const getUsers = async () => {
    const user = await User.find();
    return user;
};

const getUserByName = async (username) => {
    const user = await User.findOne({ username });
    return user;
};

const getRecentUsers = async () => {
    const user = await User.find().
        sort({ createdAt: -1 }).
        limit(10);
    return user;
};

module.exports = { getUsers, getUserByName, getRecentUsers }; 
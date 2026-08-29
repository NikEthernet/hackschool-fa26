
const User = require("../models/userModel");

const getUsers = async () => {
    const poll = await User.find();
    return poll;
};

module.exports = { getUsers }; 
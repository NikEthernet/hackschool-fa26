const express = require("express");
const {
  getUsers,
  getUserByName,
  getRecentUsers,
  createUser,
  login,
  addPastGame
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/recent", getRecentUsers);
router.get("/:username", getUserByName);
router.post("/login", login);
router.post("/", createUser);
router.post("/:username/games", addPastGame);
  
module.exports = router;
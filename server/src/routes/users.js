const express = require("express");
const { getUsers, getUserByName, getRecentUsers } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

router.get("/recent", async (req, res) => {
  try {
    const users = await getRecentUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const user = await getUserByName(req.params.username);
    res.json(user);
  } catch (err) {
    res.staus(500).json({ error: err.message });
  }
});

module.exports = router;
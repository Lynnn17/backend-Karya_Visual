const express = require("express");
const { login, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);

router.get("/logout", logout);

// router.post("/refresh", refreshAccessToken);

module.exports = router;

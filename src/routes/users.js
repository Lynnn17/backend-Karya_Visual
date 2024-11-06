const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const verifyToken = require("../middleware/authMiddleware");
const UsersController = require("../controllers/users.js");

router.get("/", verifyToken, UsersController.getAllUsers);

router.post("/add", upload.single("foto"), UsersController.createNewUser);

router.patch("/:id", verifyToken, UsersController.updataUser);

router.delete("/:id", verifyToken, UsersController.deleteUser);

module.exports = router;

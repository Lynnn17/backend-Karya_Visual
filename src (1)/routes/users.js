const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const UsersController = require("../controller/users.js");

router.get("/", UsersController.getAllUsers);

router.post("/add", upload.single("foto"), UsersController.createNewUser);

router.patch("/:id", UsersController.updataUser);

router.delete("/:id", UsersController.deleteUser);

module.exports = router;

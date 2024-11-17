const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware.js");
const BlogControllers = require("../controllers/blogController.js");

router.post("/add", upload.single("foto"), BlogControllers.createBlog);

router.patch("/:id", BlogControllers.editBlog);

router.delete("/:id", BlogControllers.deleteBlog);

module.exports = router;

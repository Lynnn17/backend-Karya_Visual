const Joi = require("joi");
const Blog = require("../models/blogModel.js");

const blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  publishedAt: Joi.date().optional(),
  show: Joi.boolean().required(),
  tag_id: Joi.number().integer().required(),
});

const createBlog = async (req, res) => {
  try {
    const { error, value } = blogSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (!req.file || !req.file.filename) {
      return res.status(400).json({ error: "Foto is required" });
    }

    const { title, content, author, publishedAt, show, tag_id } = value;

    const newBlog = await Blog.create({
      title,
      content,
      author,
      publishedAt,
      show,
      foto: req.file.filename,
      tag_id,
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editBlog = async (req, res) => {
  try {
    const { error, value } = blogSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;
    const { title, content, author, publishedAt, show, tag_id } = value;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (req.file && req.file.filename) {
      blog.foto = req.file.filename;
    }

    blog.title = title;
    blog.content = content;
    blog.author = author;
    blog.publishedAt = publishedAt;
    blog.show = show;
    blog.tag_id = tag_id;

    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await blog.destroy();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createBlog, editBlog, deleteBlog };

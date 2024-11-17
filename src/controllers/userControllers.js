const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      msg: "Get All Users",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const createNewUser = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "Name is required.",
        "any.required": "Name is required.",
      }),
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required.",
        "string.email": "Invalid email format.",
        "any.required": "Email is required.",
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required.",
        "string.min": "Password must be at least 6 characters long.",
        "any.required": "Password is required.",
      }),
      confPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Password and Confirm Password do not match.",
          "string.empty": "Confirm Password is required.",
          "any.required": "Confirm Password is required.",
        }),
      nohp: Joi.string().optional(),
      alamat: Joi.string().optional(),
      role: Joi.string().valid("admin", "user").required().messages({
        "any.only": "Role must be either 'admin' or 'user'.",
        "any.required": "Role is required.",
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }
    if (!req.file) {
      console.log(req);
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (req.body.password !== req.body.confPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password tidak cocok" });

    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      foto: req.file.filename,
      nohp: req.body.nohp,
      alamat: req.body.alamat,
      role: req.body.role,
    };
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    userData.password = hashPassword;

    const newUser = await User.create(userData);

    return res.status(201).json({
      msg: "Create New User Success",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error); //
    return res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

const updataUser = async (req, res) => {
  try {
    const { id } = req.params;

    const schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).optional(),
      confPassword: Joi.string()
        .valid(Joi.ref("password"))
        .optional()
        .messages({
          "any.only": "Password and Confirm Password do not match.",
        }),
      nohp: Joi.string().optional(),
      alamat: Joi.string().optional(),
      role: Joi.string().valid("admin", "user").optional().messages({
        "any.only": "Role must be either 'admin' or 'user'.",
      }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    if (req.file) {
      req.body.foto = req.file.filename;
    }

    await user.update(req.body);

    res.json({
      msg: "Update User Success",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.destroy();

    res.json({
      msg: "Delete User Success",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updataUser,
  deleteUser,
};

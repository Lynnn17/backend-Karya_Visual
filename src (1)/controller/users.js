const db = require("../models");
const User = db.users;
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

const createNewUser = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({
      msg: "Create New User",
      data: req.file,
    });
  } catch (error) {
    console.log("Error creating user : ", error);
  }
};

const updataUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json({
    msg: "Update User",
    data: req.body,
  });
};

const deleteUser = (req, res) => {
  res.json({
    msg: "Delete User",
  });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updataUser,
  deleteUser,
};

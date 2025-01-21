// File: userService.js
import db from "../models/index.js";
const Users = db.User;
const findUserByEmail = async (email) => {
  const user = await Users.findOne({
    where: {
      email,
    },
  });

  return user;
};

const findUsers = async () => {
  const user = await Users.findAll({
    attributes: ["id", "name", "email", "contact", "address", "role", "photo"],
  });

  return user;
};

export { findUserByEmail, findUsers };

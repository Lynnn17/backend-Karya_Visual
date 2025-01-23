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

const createUser = async ({ id, name, email, password, contact, address }) => {
  const user = await Users.create({
    id,
    name,
    email,
    password,
    contact,
    address,
  });

  return user.id;
};

export { findUserByEmail, findUsers, createUser };

import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import InvariantError from "../exception/invariantError.js";
import { findUsers, createUser } from "../repositories/userRepository.js";

const findUsersService = async () => {
  const users = await findUsers();

  if (!users) throw new InvariantError("Users not found");

  return users;
};

const createUserService = async ({
  name,
  email,
  password,
  contact,
  address,
}) => {
  await verifyNewUser(email);
  const id = `user-${nanoid(16)}`;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    id,
    name,
    email,
    password: hashPassword,
    contact,
    address,
  });

  if (!user) {
    throw new InvariantError("User not found");
  }
  return user;
};

const verifyNewUser = async (email) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new InvariantError("Email already registered");
  }
};

export { findUsersService, createUserService };

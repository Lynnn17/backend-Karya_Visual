import InvariantError from "../exception/invariantError.js";
import { findUsers } from "../repositories/userRepository.js";

const findUsersService = async () => {
  const users = await findUsers();

  if (!users) throw new InvariantError("Users not found");

  return users;
};

export { findUsersService };

import bcrypt from "bcrypt";
import { findUserByEmail } from "../repositories/userRepository.js";
import InvariantError from "../exception/invariantError.js";
import TokenManager from "../utils/tokenManager.js";

const loginUserService = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new InvariantError("Email not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new InvariantError("Wrong Password");

  const { id: userId, name, role, foto } = user;

  const accessToken = TokenManager.generateAccessToken({
    userId,
    name,
    email,
    role,
    foto,
  });

  return { userId, name, email, role, foto, accessToken };
};

export { loginUserService };

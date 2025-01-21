import { findUsersService } from "../services/userService.js";

const findUsersController = async (req, res, next) => {
  try {
    const users = await findUsersService();
    res.status(200).json({ msg: "Get All Users", data: { users } });
  } catch {
    next(error);
  }
};

export { findUsersController };

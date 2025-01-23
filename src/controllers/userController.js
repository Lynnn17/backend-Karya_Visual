import userValidator from "../validators/user/index.js";
import {
  findUsersService,
  createUserService,
} from "../services/userService.js";

const findUsersController = async (req, res, next) => {
  try {
    const users = await findUsersService();
    res.status(200).json({ msg: "Get All Users", data: { users } });
  } catch {
    next(error);
  }
};

const createUserController = async (req, res, next) => {
  try {
    const { name, email, contact, address } = req.body;
    userValidator.validatorAddUserPayload({
      name,
      email,
      password,
      contact,
      address,
    });
    const user = await createUserService({
      name,
      email,
      password,
      contact,
      address,
    });
    res.status(200).json({ msg: "Create User Success", data: { user } });
  } catch (error) {
    next(error);
  }
};

export { findUsersController, createUserController };

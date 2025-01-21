import AuthValidator from "../validators/auth/index.js";
import { loginUserService } from "../services/authService.js";

const loginController = async (req, res, next) => {
  try {
    AuthValidator.validateLoginPayload(req.body);
    const user = await loginUserService(req.body);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export { loginController };

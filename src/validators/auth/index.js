import InvariantError from "../../exception/invariantError.js";
import { loginSchema } from "./schema.js";

const AuthValidator = {
  validateLoginPayload: (payload) => {
    const { error } = loginSchema.validate(payload, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      throw new InvariantError(messages);
    }
  },
};

export default AuthValidator;

import InvariantError from "../../exception/invariantError.js";
import { addUserSchema } from "./schema.js";

const userValidator = {
  validatorAddUserPayload: (payload) => {
    const validationResult = addUserSchema.validate(payload, {
      abortEarly: false,
    });
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default userValidator;

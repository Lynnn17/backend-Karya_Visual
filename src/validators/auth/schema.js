import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("(?=.*[A-Z])"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter.",
    }),
});

export { loginSchema };

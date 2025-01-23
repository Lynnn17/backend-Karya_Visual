import Joi from "joi";

const addUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("(?=.*[A-Z])"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter.",
    }),
  contact: Joi.string().optional(),
  address: Joi.string().optional(),
});

export { addUserSchema };

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
  role: Joi.string().valid("admin", "user").required().messages({
    "any.only": "Role must be either 'admin' or 'user'.",
    "any.required": "Role is required.",
  }),
  file: Joi.binary()
    .max(5 * 1024 * 1024)
    .messages({
      "binary.max": "File must be less than 5MB.",
      "binary.base": "File is required.",
    }),
  fileType: Joi.string()
    .valid("image/jpeg", "image/png", "image/jpg", "image/bmp", "image/webp")
    .messages({
      "any.only": "File must be in JPEG, PNG, JPG, BMP, or WEBP format.",
    }),
});

export { addUserSchema };

import joi from "joi";

const newUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.ref("password"),
});
export default newUserSchema;

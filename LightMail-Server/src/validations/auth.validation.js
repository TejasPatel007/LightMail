const Joi = require("joi");
const validateRequest = require("../utils/requestValidation");

async function registerValidation(req, res, next) {
  const register = {
    firstName: Joi.string()
      .min(3)
      .max(40)
      .required()
      .trim()
      .pattern(
        /^([A-Za-z]+\s)*[A-Za-z]+$/,
        `validation as digits and consecutive spaces not allowed in`
      ),

    lastName: Joi.string()
      .min(3)
      .max(40)
      .required()
      .trim()
      .pattern(
        /^([A-Za-z]+\s)*[A-Za-z]+$/,
        `validation as digits and consecutive spaces not allowed in`
      ),

    role: Joi.string().valid("user", "admin", "superAdmin").trim(),

    email: Joi.string()
      .trim()
      .email()
      .required()
      .lowercase()
      .pattern(
        /^[a-z0-9]+(\.[a-z0-9]+)?@(lightmail\.com)$/,
        "validation as suffix should be @lightmail.com only in"
      ),

    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{4,}$/,
        "validation as password must contain atleast 1 uppercase, 1 lowecase, 1 digit & 1 special character in"
      ),

    confirmPassword: Joi.string().custom((value, helper) => {
      if (value !== req.body.password) {
        return helper.message("Password And Confirm Password Are Not Same");
      }
    }),
  };
  validateRequest(req, res, next, Joi.object(register));
}

async function LoginValidation(req, res, next) {
  const Login = {
    email: Joi.string().trim().email().required().lowercase(),

    password: Joi.string().required(),
  };
  validateRequest(req, res, next, Joi.object(Login));
}

module.exports = {
  registerValidation,
  LoginValidation,
};

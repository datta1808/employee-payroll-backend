const Joi = require("joi");

class Validation {
  //joi Object
  validateInput = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(30)
      .pattern(new RegExp("^[A-Z]{1}[a-z]{1,30}"))
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(30)
      .pattern(new RegExp("^[A-Z]{1}[a-z]{1,30}"))
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    ),
  });

  //validates Credentials
  loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });
}

//exporting module
module.exports = new Validation();

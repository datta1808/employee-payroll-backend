const Joi = require("joi");

//joi Object
const validateInput = Joi.object({
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
  email: Joi.string()
    .pattern(
      new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      )
    )
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required(),
});

//exporting module
module.exports = { validateInput };

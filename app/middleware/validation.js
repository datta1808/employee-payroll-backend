'use strict';
//importing property/function for joi
const { string } = require('joi');

//importing joi module
const Joi = require('joi');

//joi validating object
const validateInput = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^[A-Z]{1}[a-z]{1,30}'))
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required(),
  phoneNumber: Joi.string(),
  department: Joi.string(),
  salary: Joi.string(),
  company: Joi.string(),
});

//exporting module
module.exports = { validateInput };
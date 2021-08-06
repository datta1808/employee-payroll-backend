const service = require("../services/user.js");

// Require logger.js
const logger = require("../../config/logger");

const { validateInput } = require("../middleware/userValidation.js");

class UserController {
  //user registration
  registerUser = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        logger.error("Invalid Params");
        return res.status(400).send({
          success: false,
          message: userInputValidation.error.details[0].message,
          data: req.body,
        });
      }

      // Object to get user input
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      // passing the above object as an argument to the registerNewEmployee Method
      service.registerNewUser(newUser, (err, data) => {
        if (err) {
          logger.error("Error while registering the new user");
          res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while adding user",
          });
        } else {
          logger.info("User registered successfully!");
          res.status(201).send({
            success: true,
            message: "User registered successfully",
            data: data,
          });
        }
      });
    } catch (err) {
      logger.error("Error while registering the new user");
      return res.status(500).send({
        success: false,
        message: err.message || "Some error occurred!",
      });
    }
  };

  // user login
  loginUser(req, res) {
    try {
      const userCredentials = {
        email: req.body.email,
        password: req.body.password,
      };

      // calling a function to login employee
      service.userLogin(userCredentials, (err, data) => {
        if (err) {
          logger.error("Error while authenticating the user");
          res.status(400).send({
            success: false,
            message: err,
          });
        } else {
          logger.info("User logged in!");
          res.status(200).send({
            success: true,
            message: "Login successful",
            token: data,
          });
        }
      });
    } catch (err) {
      logger.error("Error while authenticating the user");
      res.status(500).json({
        success: false,
        message: "Some error occurred while authenticating the user",
      });
    }
  }
}

module.exports = new UserController();

const userSchema = require("../models/user.js");

// Require logger.js
const logger = require("../../config/logger");

//Importing helper class
const helper = require("../middleware/helper.js");

class UserService {
  // method for registering a new user
  registerNewUser = (newUser, callback) => {
    try {
      // calling method from the models
      userSchema.newUserRegistration(newUser, (err, data) => {
        if (err) {
          logger.error("Error while registering the new user");
          return callback(err, null);
        } else {
          logger.info("User registered successfully!");
        return callback(null, data);
        }
      });
    } catch (err) {
      return res.send({
        success: false,
        message: err.message || "Some error occurred!",
      });
    }
  };

  // method for user login
  userLogin = (userCredentials, callback) => {
    try {
      userSchema.loginUser(userCredentials, (err, data) => {
        //check if the password matches
        if (helper.comparePassword(userCredentials.password, data.password)) {
          //create a token
          const token = helper.generateToken(userCredentials);
          logger.info("Token is generated");
          return !token
            ? callback(
                "Email or Password do not match",
                null
              )
            : callback(null, token);
        } else if (error) {
          logger.info("Please enter a valid password");
          callback(error, null);
        }
      });
    } catch (error) {
      return callback(error, null);
    }
  };
}

module.exports = new UserService();

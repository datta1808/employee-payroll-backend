const userSchema = require("../models/user.js");

//Importing helper class
const helper = require("../middleware/helper.js");

class UserService {
  // method for registering a new user
  registerNewUser = (newUser, callback) => {
    try {
      // calling method from the models
      userSchema.newUserRegistration(newUser, (err, data) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, data);
      });
    } catch (err) {
      return res.send({
        success: false,
        message: err.message || "Some error occurred!",
      });
    }
  };

  // method for user login
  userLogin(userCredentials, callback) {
    const token = helper.generateToken(userCredentials);
    userSchema.loginUser(userCredentials, (err, data) => {
      if (err) {
        return callback(err, null);
      } else if (
        !helper.comparePassword(userCredentials.password, data.password)
      ) {
        return callback("Email or Password do not match", null);
      }
      return callback(null, token);
    });
  }
}

module.exports = new UserService();

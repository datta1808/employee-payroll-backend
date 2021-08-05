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
  userLogin = (userCredentials, callback) => {
    try {
      userSchema.loginUser(userCredentials, (err, data) => {
        //check if the password matches
        if (helper.comparePassword(userCredentials.password, data.password)) {
          //create a token
          const token = helper.generateToken(userCredentials);
          return !token
            ? callback(
                "Email or Password do not match",
                null
              )
            : callback(null, token);
        } else if (error) {
          callback(error, null);
        }
      });
    } catch (error) {
      return callback(error, null);
    }
  };
}

module.exports = new UserService();

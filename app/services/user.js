const userSchema = require("../models/user.js");

class UserService {

  registerNewEmployee = (newUser, callback) => {
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
}

module.exports = new UserService();

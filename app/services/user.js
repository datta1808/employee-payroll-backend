const userSchema = require("../models/user.js");

class UserService {
  registerNewEmployee = (newUser, callback) => {
    try {
      //calling the method to create new employee object with given data
      userSchema.newUserRegistration(newUser, (err, data) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };
}

module.exports = new UserService();

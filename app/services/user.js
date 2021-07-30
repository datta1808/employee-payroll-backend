const userSchema = require("../models/user.js");

//Importing helper class
const helper = require('../middleware/helper.js');

class UserService {

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

  login(userDetails, callback) {
    
    userSchema.userLogin(userDetails, (err, data) => {
      if (err) {
        callback(err, null);
      } else if( !helper.passwordCheck(userDetails.password, data.password)) {
        return callback('Wrong password!', null);
      }
    });
  }
}


module.exports = new UserService();

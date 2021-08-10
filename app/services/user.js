/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Invokes the functions related to the database 
 *
 * @description
 *
 * @file        : services/user.js
 * @overview    : calls functions from the model to respond to the controller
 * @module      : This is necessary to perform CRUD operations
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : _ _ _
 * @since       : 28-07-2021
 *********************************************************************/

const userSchema = require("../models/user.js");

// Require logger.js
const logger = require("../../config/logger");

//Importing helper class
const helper = require("../middleware/helper.js");

class UserService {
  /**
     * @description function created to create user into database
     * @param {*} newUser
     * @param {*} callBack 
     */
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
      callback(err || 'Some error occurred!', null);
    }
  };

  /**
     * @description function created to login user
     * @param {*} userCredentials 
     * @param {*} callBack 
     */
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
                "Wrong password!",
                null
              )
            : callback(null, token);
        } else if (error) {
          logger.info("Invalid Credintials");
          return callback(error, null);
        }
      });
    } catch (error) {
      return callback(error, null);
    }
  };
}

module.exports = new UserService();

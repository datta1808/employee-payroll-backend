/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Describes the schema for user registration & login 
 *
 * @description
 *
 * @file        : models/user.js
 * @overview    : Provides schema for database and performs registering user and authorizing
 * @module      : Registration
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : _ _ _
 * @since       : 28-07-2021
 *********************************************************************/

'use strict';

const mongoose = require("mongoose");
// Require logger.js
const logger = require("../../config/logger");

const bcrypt = require("bcrypt");

const saltRounds = 10;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 'pre' acts as a middleware between userSchema & save() method
userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (err) return next(err);
    //assigning hashed password again to the current password
    this.password = hashedPassword;
    next();
  });
});

// createing a collection & assigning it to a constant
// collection name should be always singular
const userRegister = mongoose.model("RegisterUser", userSchema);

// Exporting schema as a module, so that we can directly access the data inside structure.
module.exports = mongoose.model("userSchema", userSchema);

class Registration {
  /**
     * @description function written to create new user into database 
     * @param {*} newUser
     * @param {*} callBack 
     */
  newUserRegistration = (newUser, callback) => {
    try {
      const user = new userRegister({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      });

      // save
      user.save({}, (err, data) => {
        if (err) {
          logger.error("Error while saving the new user");
          return callback(err, null);
        } else {
          logger.info("User saved successfully");
          return callback(null, data);
        }
      });
    } catch (err) {
      logger.error("Error while saving the new user");
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred!",
      });
    }
  };

  /**
     * @description checks if email is present or not
     * @param {*} clientCredentials
     * @param {*} callBack 
     */
  loginUser(clientCredentials, callback) {
    userRegister.findOne({ email: clientCredentials.email }, (err, data) => {
      if (err) {
        logger.error("Error while login");
        return callback(err, null);
      } else if (!data) {
        logger.error("User not found with Email");
        return callback('User not found with email', null);
      } 
        logger.info("Email is matched");
        return callback(null, data); //data = users
    });
  }
}

module.exports = new Registration();

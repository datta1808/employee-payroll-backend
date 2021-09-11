/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Controls the operations of registration and login
 *
 * @description
 *
 * @file        : controllers/user.js
 * @overview    : controls user registration and login tasks
 * @module      : UserController
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : _ _ _
 * @since       : 28-07-2021
 *********************************************************************/

const service = require('../services/user.js');

// Require logger.js
const logger = require('../../config/logger');

const validator = require('../middleware/userValidation.js');

class UserController {
  /**
   * function to call the create function from service.js (creates new employee)
   * @param {*} req
   * @param {*} res
   * @returns HTTP status and object
   */
  registerUser(req, res) {
    try {
      // Object to get user input
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      //validation
      const userInputValidation = validator.validateInput.validate(newUser);
      if (userInputValidation.error) {
        logger.error('Invalid Details for registration');
        return res.status(400).send({
          success: false,
          message: userInputValidation.error.details[0].message,
        });
      }

      // passing the above object as an argument to the registerNewEmployee Method
      service.registerNewUser(newUser, (err, data) => {
        return err
          ? res.status(500).send({
              success: false,
              message: err.message || 'Some error occurred while adding user',
            })
          : res.status(201).send({
              success: true,
              message: 'User registered successfully',
              data: data,
            });
      });
    } catch (err) {
      logger.error('Error while registering the new user');
      return res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred!',
      });
    }
  }

  /**
   * To login the employee and authenticate
   * @param {*} req
   * @param {*} res
   */
  loginUser(req, res) {
    const userCredentials = {
      email: req.body.email,
      password: req.body.password,
    };
    const userInputValidation =
      validator.loginValidator.validate(userCredentials);
    if (userInputValidation.error) {
      logger.error('Invalid Details for login');
      return res.status(400).send({
        success: false,
        message: 'Invalid Username or Password',
      });
    }

    // calling a function to login employee
    service.userLogin(userCredentials, (err, data) => {
      if (err) {
        logger.error('Error while authenticating the user');
        return res.status(404).send({
          success: false,
          message: err,
        });
      } else {
        logger.info('User logged in!');
        res.status(200).send({
          success: true,
          message: 'Login successful',
          token: data,
        });
      }
    });
  }
}

module.exports = new UserController();

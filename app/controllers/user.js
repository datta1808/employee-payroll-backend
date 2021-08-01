const service = require("../services/user.js");

//Importing middle ware to validate schema (joi validator)
const { validateInput } = require('../middleware/userValidation.js');

class UserController {

      //user registration
      registerUser = (req, res) => {
        try {
          //validation
          const userInputValidation = validateInput.validate(req.body);
          if (userInputValidation.error) {
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
        return err
           ? res.status(500).send({
               success: false,
               message:
                 err.message || 'Some error occurred while adding user',
             })
           : res.status(201).send({
               success: true,
               message: 'User registered successfully',
               data: data,
             });
       });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message || "Some error occurred!",
      });
    }
  };

  // user login
  loginUser(req, res) {
    const userCredentials = {
      email: req.body.email,
      password: req.body.password,
    };
    
    // calling a function to login employee
    service.userLogin(userCredentials, (err, data) => {
      if (err) {
        res.status(400).send({ 
          success: false, 
          message: err 
        })
      } else {
         res.status(200).send({ 
           success: true, 
           message: 'Login successful', data: data 
          });
      }
    });
  }
}

module.exports = new UserController();

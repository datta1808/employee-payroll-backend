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
    

      // Object
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      // passing the above object as an argument to the registerNewEmployee Method
      service.registerNewUser(newUser, (err, data) => {
        if (err) {
          res.status(404).send({
            success: false,
            message: err.message || "Some error occurred while adding user",
          });
        } else {
          res.status(201).send({
            success: true,
            message: "User registered successfully",
            data: data,
          });
        }
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
    const userCredintials = {
      email: req.body.email,
      password: req.body.password,
    };

    // calling the login method of service layer
    service.login(userCredintials, (err, data) => {
      return err
        ? res
            .status(500)
            .send({ message: err.message || 'Some error occurred!' })
        : res.status(200).send(data);
    });
  }
}

module.exports = new UserController();

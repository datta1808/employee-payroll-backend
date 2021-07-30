const service = require("../services/user.js");

class UserController {
  
  registerUser = (req, res) => {
    try {
      // Object
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      // passing the above object as an argument to the registerNewEmployee Method
      service.registerNewEmployee(newUser, (err, data) => {
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
}

module.exports = new UserController();

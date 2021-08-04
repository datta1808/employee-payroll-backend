const userController = require("../controllers/user");

module.exports = (app) => {

  // register new user
  app.post("/register", userController.registerUser);

  // user login
  app.post("/login", userController.loginUser);

};
module.exports = (app) => {
    
  const userController = require("../controllers/user");

  // register new user
  app.post("/register", userController.registerUser);

  // user login
  app.post("/login", userController.loginUser);
};

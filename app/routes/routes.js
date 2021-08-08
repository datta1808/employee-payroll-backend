const userController = require("../controllers/user");

const employeeController = require('../controllers/employeePayroll');

const helper = require('../middleware/helper');


module.exports = (app) => {

  // register new user
  app.post("/register", userController.registerUser);

  // user login
  app.post("/login", userController.loginUser);

  // To create a new employee
  app.post('/addEmployee', helper.verifyToken, employeeController.addEmployee);

  // Getting all the data from the server
  app.get('/getEmployees', helper.verifyToken, employeeController.getAllEmployees);

  // Getting employee by id
  app.get( '/getEmployee/:empId', helper.verifyToken, employeeController.getOneEmployee);

  // Updating the employee
  app.put( '/updateEmployee/:empId', helper.verifyToken, employeeController.updateEmployee );

  // deleting the employee
  app.delete( '/deleteEmployee/:empId', helper.verifyToken, employeeController.removeEmployee);

};
const userController = require("../controllers/user");

const employeeController = require('../controllers/employeePayroll');


module.exports = (app) => {

  // register new user
  app.post("/register", userController.registerUser);

  // user login
  app.post("/login", userController.loginUser);

  // To create a new employee
  app.post('/addEmployee', employeeController.addEmployee);

  // Getting all the data from the server
  app.get('/getEmployees', employeeController.getAllEmployees);

  // Getting employee by id
  app.get( '/getEmployee/:empId', employeeController.getOneEmployee );

  // Updating the employee
  app.put( '/updateEmployee/:empId', employeeController.updateEmployee );

  // deleting the employee
  app.delete( '/deleteEmployee/:empId', employeeController.removeEmployee );

};
const employeeSchema = require("../models/employeePayroll");

// Service Class
class Service {
  addNewEmployee = (newEmployee, callback) => {
    try {
      // method to create new employee object with given data
      employeeSchema.createEmployee(newEmployee, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err || "Some error occurred!", null);
    }
  };

  getAllEmp = (callback) => {
    try {
      //method to get all the employees
      employeeSchema.findAll((err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  getOne = (empId, callback) => {
    try {
      if (!empId.empId) {
        return res
          .status(404)
          .send({ message: `Employee with id: ${empId._id} not found` });
      }
      // method to get employee data with id
      employeeSchema.getDataById(empId.empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  update = function (empId, empData, callback) {
    try {
      //calling method to update employee
      employeeSchema.updateEmpById(empId, empData, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  remove = (empId, callback) => {
    try {
      if (!empId) {
        return res.status(404).send({ message: "Employee not found" });
      }

      //method to delete employee
      employeeSchema.removeEmpById(empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };
}

//exporting class
module.exports = new Service();

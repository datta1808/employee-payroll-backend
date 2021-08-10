const employeeModel = require("../models/employeePayroll");

// Service Class
class Service {
  async addNewEmployee(newEmployee) {
    try {
      // method to create new employee object with given data
      const empSaved = await employeeModel.createEmployee(newEmployee);
      return empSaved;
    } catch (err) {
      return err;
    }
  }

  getAllEmp = () => {
    //method to get all the employees
    return employeeModel
      .findAll()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  };

  async getOne(empId) {
    try {
      if (!empId.empId) {
        return res
          .status(404)
          .send({ message: `Employee with given id not found` });
      }
      // method to get employee data with id
      return await employeeModel.getDataById(empId.empId);
    } catch (error) {
      return error;
    }
  }

  async update(empId, empData) {
    try {
      //calling method to update employee
      return await employeeModel.updateEmpById(empId, empData);
    } catch (error) {
      return error;
    }
  }

  // method to delete employee using promises
  deleteEmpData = (empId, callback) => {
    try {
      employeeModel.deleteById(empId, (error, data) => {
        return error ? callback(error, null) : callback(null, data);
      });
    } catch (error) {
      return callback(error, null);
    }
  };
}

//exporting class
module.exports = new Service();

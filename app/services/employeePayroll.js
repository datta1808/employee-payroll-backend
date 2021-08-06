const employeeSchema = require("../models/employeePayroll");

// Service Class
class Service {
  async addNewEmployee(newEmployee) {
    try {
      // method to create new employee object with given data
      const empSaved = await employeeSchema.createEmployee(newEmployee);
        return empSaved;
    } catch (err) {
        return err;
    }
  };

  async getAllEmp(){
    try {
      //method to get all the employees
      return await employeeSchema.findAll()
    } catch (err) {
        return err
    }
  };

  async getOne(empId) {
    try {
      if (!empId.empId) {
        return res
          .status(404)
          .send({ message: `Employee with given id not found` });
      }
      // method to get employee data with id
      return await employeeSchema.getDataById(empId.empId);
    } catch (error) {
        return error;
    }
  };

  async update(empId, empData) {
    try {
      //calling method to update employee
      return await employeeSchema.updateEmpById(empId, empData)
    } catch (error) {
        return error;
    }
  };

  async remove (empId) {
    try {
      if (!empId) {
        return res.status(404).send({ message: "Employee not found" });
      }

      //method to delete employee
      return await employeeSchema.removeEmpById(empId);
    } catch (error) {
        return error
    }
  };
}

//exporting class
module.exports = new Service();

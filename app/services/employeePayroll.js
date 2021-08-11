/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Encapsulates the applications business logic
 *
 * @description
 *
 * @file        : models/employeePayroll.js
 * @overview    : Provides schema for database and performs CRUD operations
 * @module      : Employee
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : _ _ _
 * @since       : 28-07-2021
 *********************************************************************/


const employeeModel = require("../models/employeePayroll");

// Service Class
class Service {
  /**
     * @description function to register the employees
     * @param {*} newEmployee 
     */
  async addNewEmployee(newEmployee) {
    try {
      // method to create new employee object with given data
      const empSaved = await employeeModel.createEmployee(newEmployee);
      return empSaved;
    } catch (err) {
      return err;
    }
  }

  /**
     * @description This function will fetch data from the database
     */
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

  /**
     * @description finding employee by id
     * @param {*} empId 
     */
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

  /**
     * @description updating employee by id
     * @param {*} empId 
     */
  async update(empId, empData) {
    try {
      //calling method to update employee
      return await employeeModel.updateEmpById(empId, empData);
    } catch (error) {
      return error;
    }
  }

  /**
     * @description delete employee by id
     * @param {*} empId 
     * @param {*} callback 
     */
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

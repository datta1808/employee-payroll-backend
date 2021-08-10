/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Describes the schema for employee details
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

'use strict';

const mongoose = require("mongoose");

//importing bcrypt
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Schema for the employee-details
const employeeSchema = mongoose.Schema(
  //employeeDataSchema
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

employeeSchema.pre("save", function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    this.password = hashedPassword;
    next();
  });
});

const employeeData = mongoose.model("Employee", employeeSchema);

class Employee {
  /** 
  * @description funnction to register employee in the database
  * @param {*} newEmployee 
  * @returns saved data or if error returns error 
  */
  async createEmployee(newEmployee) {
    try {
      const employee = new employeeData({
        name: newEmployee.name,
        email: newEmployee.email,
        password: newEmployee.password,
        phoneNumber: newEmployee.phoneNumber,
        department: newEmployee.department,
        salary: newEmployee.salary,
        company: newEmployee.company,
      });

      //to save the new data
      const empSaved = await employee.save({});
      return empSaved;
    } catch (error) {
      return error;
    }
  }

  /**
     * @description function to get all employees from database 
     * @returns retrieved employees or if error returns error
     */
  findAll = () => {
    return new Promise((resolve, reject) => {
      employeeData
        .find({})
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
     * @description function written to get employees by Id into database 
     * @param {*} empId
     * @returns employee of particular Id or if any error return error
     */
  async getDataById(empId) {
    try {
      return await employeeData.findById(empId);
    } catch (err) {
      return error;
    }
  }

/**
     * @description function written to update employees by Id into database 
     * @param {*} empId
     * @param {*} empData
     * @returns employee\ of particular Id or if any error return error
     */
  async updateEmpById(empId, empData) {
    try {
      return await employeeData.findByIdAndUpdate(
        empId.empId,
        {
          name: empData.name,
          email: empData.email,
          password: empData.password,
          phoneNumber: empData.phoneNumber,
          department: empData.department,
          salary: empData.salary,
          company: empData.company,
        },
        { new: true }
      );
    } catch (error) {
      return error;
    }
  }

  /**
     * @description function to delete employee by id
     * @param {*} empId 
     * @returns data else if error returns error
     */
   deleteById = (empId, callback) =>{
    employeeData.findByIdAndRemove(empId,(error, data)=>{
        return((error)? (callback(error, null)):(callback(null, data)));
    })
}
}
//exporting class
module.exports = new Employee();

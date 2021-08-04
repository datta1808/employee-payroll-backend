"use strict";
const mongoose = require("mongoose");

//Importing bcrypt
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Schema for the employee-details
const employeeSchema = mongoose.Schema(
  //employeeDataSchema
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


employeeSchema.pre("save", function (next) {
  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    this.password = hashedPassword;
    next();
  });
});

const employeeData = mongoose.model("Employee", employeeSchema);

module.exports = mongoose.model("employeeSchema", employeeSchema);


class Employee {
  //create method
  createEmployee = (newEmployee, callback) => {
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
      employee.save({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //Get all the data from the server
  findAll = (callback) => {
    try {
      employeeData.find({}, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //get one employee by id
  getDataById = (empId, callback) => {
    try {
      employeeData.findById(empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };

  //update with id
  updateEmpById = (empId, empData, callback) => {
    console.log(`Employee id: ${empId.empId}`);

    try {
      employeeData.findByIdAndUpdate(
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
        { new: true },
        (err, data) => {
          return err ? callback(err, null) : callback(null, data);
        }
      );
    } catch (err) {
      callback(err, null);
    }
  };

  //Removing employee with id
  removeEmpById = (empId, callback) => {
    try {
      employeeData.findByIdAndRemove(empId.empId, (err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    } catch (err) {
      callback(err, null);
    }
  };
}

//exporting class
module.exports = new Employee();

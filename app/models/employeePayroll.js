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
      unique: true
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
  //create method
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

  //Get all the data from the server
  async findAll() {
    try {
        return await employeeData.find({});
    } catch (error) {
        return error;
    }
  }

  //get one employee by id
  async getDataById(empId) {
    try {
      return await employeeData.findById(empId)
    } catch (err) {
        return error;
    }
  }

  //update with id
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
        { new: true });
    } catch (error) {
        return error;
    }
  };

  //Removing employee with id
  async removeEmpById(empId) {
    try {
      return await employeeData.findByIdAndDelete(empId);
    } catch (error) {
        return error;
    }
  };
}

//exporting class
module.exports = new Employee();

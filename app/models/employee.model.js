const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    name: String,
    gender: String,
    department: String,
    salary: String,
    email: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);

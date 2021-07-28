const Employee = require("../models/employee.model.js");

// Create and Save a new Employee
exports.create = (req, res) => {
  if (
    !req.body.name ||
    !req.body.gender ||
    !req.body.department ||
    !req.body.salary ||
    !req.body.email 
  ) {
    return res.status(400).send({
      message: "All the fields are necessary",
    });
  }

  // Create an Employee Data
  const employee = new Employee({
    name: req.body.name,
    gender: req.body.gender,
    department: req.body.department,
    salary: req.body.salary,
    email: req.body.email,
  });

  // Save employee in the database
  employee
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occurred while saving the employee data!",
      });
    });
};

// Retrieve and return all employees from the database.
exports.findAll = (req, res) => {
  Employee.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occurred while retrieving the data!",
      });
    });
};

// Find a single Employee with a empId
exports.findOne = (req, res) => {
  Employee.findById(req.params.empId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.empId,
        });
      }
      res.send(employee);
    })
    .catch(err => {
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.empId,
      });
    });
};

// Update an Employee identified by the empId in the request
exports.update = (req, res) => {
  Employee.findByIdAndUpdate(
    req.params.empId,
    {
      name: req.body.name,
      gender: req.body.gender,
      department: req.body.department,
      salary: req.body.salary,
      email: req.body.email,
    },
    { new: true }
  )
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.empId,
        });
      }
      res.send({ message: "Employee details updated successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.empId,
        });
      }
      return res.status(500).send({
        message: "Error updating Employee with id " + req.params.empId,
      });
    });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Employee.findByIdAndRemove(req.params.empId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.empId,
        });
      }
      return res.send({
        message: "Employee deleted successfully!",
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.empId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Employee with id " + req.params.empId,
      });
    });
};

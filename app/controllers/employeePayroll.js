const service = require("../services/employeePayroll.js");

const { validateInput } = require("../middleware/validation");

class EmployeeController {
  addEmployee = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res
          .status(400)
          .send({ message: userInputValidation.error.details[0].message });
      }

      //Object for the new employee data
      const newEmployee = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        salary: req.body.salary,
        company: req.body.company,
      };

      //calling method to add new employee data
      service.addNewEmployee(newEmployee, (err, data) => {
        if (err) {
           res.status(500).send({
              success: false,
              message:
                err.message || "Some error occurred while adding employee",
            })
        } else {
           res
              .status(201)
              .send({ message: "Employee added successfully", data: data });
        }
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || "Some error occurred!" });
    }
  };

  getAllEmployees = (req, res) => {
    try {
      service.getAllEmp((err, data) => {
        if (err) {
          res.status(500).send({
            success: false,
            message: err.message || "some error occurred",
          });
        } else {
          res.status(200).send(data);
        }
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || "Some error occurred!" });
    }
  };

  getOneEmployee = (req, res) => {
    const empId = req.params;
    try {
      service.getOne(empId, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "some error occurred while getting the data!",
          });
        } else {
          res
            .status(200)
            .send({ success: true, data: data || "employee not found!" });
        }
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Some error occurred!" });
    }
  };

  updateEmployee = (req, res) => {
    try {
      //validation
      const userInputValidation = validateInput.validate(req.body);
      if (userInputValidation.error) {
        return res
          .status(400)
          .send({ message: userInputValidation.error.details[0].message });
      }

      //id param for updating exact employee
      const empId = req.params;

      //employee updated details from client
      const updatedDetails = {
        id: req.params.empId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        salary: req.body.salary,
        company: req.body.company,
      };

      //calling method to update employee data
      service.update(empId, updatedDetails, (err, data) => {
        if (err) {
          res.status(500).send({
            success: false,
            message:
              err.message || "some error occurred while updating the details!",
          });
        } else {
          res.status(200).send({
            message: "Employee Details Updated!",
            data: data,
          });
        }
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Some error occurred!" });
    }
  };

  removeEmployee = (req, res) => {
    //id param for updating exact employee
    const empId = req.params;

    try {
      //calling method to delete employee data
      service.remove(empId, (err, data) => {
        if (err) {
          res.status(500).send({ message: "Some error occurred!" });
        } else {
          res.status(200).send({
            success: true,
            message: "Employee deleted successfully!",
          });
        }
      });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message || "Some error occurred!" });
    }
  };
}

//exporting the class
module.exports = new EmployeeController();

const service = require("../services/employeePayroll.js");

const { validateInput } = require("../middleware/validation");

class EmployeeController {
  async addEmployee(req, res) {
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
      const empCreated = await service.addNewEmployee(newEmployee);
      res.send({success: true, message: "Employee Created!", data: empCreated});
    } catch (error) {
            res.status(500).send({success: false, message: "Some error occurred while creating Employee" });
    }
  };

  
  getAllEmployees = (req, res) => {
      service.getAllEmp().then(data => {
          return res.send(data)
      }).catch(err => {
          return res.send(err)
      })
    }
      
    
  async getOneEmployee(req, res) {
    const empId = req.params;
    try {
      const getEmployee = await service.getOne(empId);
      res.json(getEmployee);
    } catch (err) {
      res.status(500).send({ message: err.message || "Some error occurred!" });
    }
  };

  async updateEmployee(req, res) {
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
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        department: req.body.department,
        salary: req.body.salary,
        company: req.body.company,
      };

      //calling method to update employee data
      const updateEmployee = await service.update(empId, updatedDetails);
      res.send(updateEmployee);
      
    } catch (err) {
      res.status(500).send({ message: err.message || "Some error occurred while updating an employee!" });
    }
  };

  deleteEmp = (req,res) =>{
    let empId = req.params.empId;
    service.deleteEmpData(empId,(error,data)=>{
        return((error)?res.status(400).send({
            success:false,
            message: "Error occured while deleting employee"
        }):
        res.send({
            success: true,
            message: "Employee deleted successfully!",
            data: data
        }));
    });
}
}


//exporting the class
module.exports = new EmployeeController();

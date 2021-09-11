const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../server");
const userInput = require("./user.json");
chai.should();

//using chaiHTTP
chai.use(chaiHTTP);

/**
 * @description Test cases for registering new user.
 *              Contains both positive and negative cases.
 */
// eslint-disable-next-line no-undef
describe("POST - User Registration", () => {
  it("givenNewValidData_whenAdded_shouldRehisterUser", (done) => {
    const userDetails = userInput.registerUserPass;
    chai
      .request(server)
      .post("/register")
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        res.body.should.have
          .property("message")
          .eql("User registered successfully");
        res.body.should.have.property("data").which.is.an("object");
        err ? done(err) : done();
      });
  });

  it("givenInValidData_whenAdded_shouldReturnError", (done) => {
    const userDetails = userInput.registerUserFirstNameFail;
    chai
      .request(server)
      .post("/register")
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql(
            `\"firstName\" with value "${userDetails.firstName}" fails to match the required pattern: /^[A-Z]{1}[a-z]{1,30}/`
          );
        err ? done(err) : done();
      });
  });

  it("givenInValidlastName_whenAdded_shouldReturnError", (done) => {
    const userDetails = userInput.registerUserLastNameFail;
    chai
      .request(server)
      .post("/register")
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql(
            `\"lastName\" with value "${userDetails.lastName}" fails to match the required pattern: /^[A-Z]{1}[a-z]{1,30}/`
          );
        err ? done(err) : done();
      });
  });
});

/**
 * @description Test cases for User login.
 *              Contains both positive and negative cases.
 */
describe("POST - User Login", () => {
  it("givenValidEmailAndPassword_shouldLoginTheUser_andReturnToken", (done) => {
    const userCredentials = userInput.userLoginPass;
    chai
      .request(server)
      .post("/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Login successful");
        err ? done(err) : done();
      });
  });

  it("givenInvalidEmail_AndValidPassword_shouldReturnError", (done) => {
    const userCredentials = userInput.loginWrongEmail;
    chai
      .request(server)
      .post("/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql("Invalid Username or Password");
        err ? done(err) : done();
      });
  });

  it("givenValidEmail_AndInValidPassword_shouldReturnError", (done) => {
    const userCredentials = userInput.userLoginWrongPasswordFail;
    chai
      .request(server)
      .post("/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql("Invalid Username or Password");
        err ? done(err) : done();
      });
  });
});

//method to execute before further Test Cases
describe("Employee Payroll API", () => {
  let token = "";

  beforeEach((done) => {
    const userData = userInput.userLoginPass;
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        if (err) return done(err);
        done();
      });
  });

  /**
   * @description: Test cases for creating new employee object with POST.
   *               Contains positive and negative cases.
   */
  describe("POST - Add New Employee", () => {
    it("givenUserDetails_whenValid_shouldAddNewEmployee", (done) => {
      const employeeDetails = userInput.addEmployeePass;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token) // authorization parameter is set
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("Employee Created!");
          res.body.should.have.property("data").should.be.a("object");
          if (err) return done(err);
          done();
        });
    });

    it("givenUserDetails_whenNameIsInWrongFormat_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidNameFormat1;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              `\"name\" with value \"${employeeDetails.name}\" fails to match the required pattern: /^[A-Z]{1}[\\sA-Za-z]{1,30}/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenNameIsLessThanThreeChars_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidNameFormat2;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql('"name" length must be at least 2 characters long');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenNameIsEmptyString_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidNameFormat3;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql('"name" is required');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenNameIsNotAString_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidNameFormat4;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql('"name" must be a string');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenEmailIsInWrongFormat_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidEmailFormat;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql('"email" must be a valid email');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenPasswordDoesNotContainUpperCaseChar_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidPasswordFormat1;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              `"password" with value "${employeeDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenPasswordDoesNotContainNumber_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidPasswordFormat2;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              `"password" with value "${employeeDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            console.log(`Error: ${error}`);
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenPasswordDoesNotContainLoweCaseChar_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidPasswordFormat3;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              `"password" with value "${employeeDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            console.log(`Error: ${error}`);
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenPasswordDoesNotContainSpecialChar_shouldReturnError", (done) => {
      const employeeDetails = userInput.addEmployeeInvalidPasswordFormat4;
      chai
        .request(server)
        .post("/addEmployee")
        .send(employeeDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              `"password" with value "${employeeDetails.password}" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for retrieving all the employees with GET.
   *              Contains positive and negative cases.
   */
  describe("GET - Retrieves All Data", () => {
    it("givenValidRequest_shouldReturn_AllTheEmployeesData", (done) => {
      chai
        .request(server)
        .get("/getEmployees")
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenInValidToken_shouldReturnError", (done) => {
      chai
        .request(server)
        .get("/getEmployees")
        .set("token", token + "1")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("invalid signature");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for updating the employees by id with PUT.
   *              Contains positive and negative cases.
   */
  describe("PUT - Update Employee Data", () => {
    it("givenValidData_shouldUpdate_employeeDataSuccessfully", (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.getOnePass.id}`)
        .send(userInput.updateEmployeePass)
        .set("token", token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          if (error) {
            return done(error);
          }
          done();
        });
    });

    it("givenInValidNameFormat_shouldReturn_errorMessage", (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.getOnePass.id}`)
        .send(userInput.addEmployeeInvalidNameFormat1)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              `"name" with value "${userInput.addEmployeeInvalidNameFormat1.name}" fails to match the required pattern: /^[A-Z]{1}[\\sA-Za-z]{1,30}/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenInValidEmailFormat_shouldReturn_errorMessage", (done) => {
      chai
        .request(server)
        .put(`/updateEmployee/${userInput.getOnePass.id}`)
        .send(userInput.addEmployeeInvalidEmailFormat)
        .set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql('"email" must be a valid email');
          if (error) {
            return done(error);
          }
          done();
        });
    });

    /**
     * @description Test cases for deleting the employee by id with DELETE.
     *              Contains positive and negative cases.
     */
    describe("DELETE - Removes Employee", () => {
      it("givenValidIDAndToken_shouldDelete_employeeDataSuccessfully", (done) => {
        chai
          .request(server)
          .delete(`/deleteEmployee/${userInput.deletePass.id}`)
          .set("token", token)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("success").eql(true);
            res.body.should.have
              .property("message")
              .eql("Employee deleted successfully!");
            if (error) {
              return done(error);
            }
            done();
          });
      });

      it("givenInValidID_andValidToken_shouldReturnErrorMessage", (done) => {
        chai
          .request(server)
          .delete(`/deleteEmployee/${userInput.getOneFail.id}`)
          .set("token", token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("success").eql(false);
            res.body.should.have
              .property("message")
              .eql("Error occured while deleting employee");
            if (err) {
              return done(err);
            }
            done();
          });
      });
    });
  });
});

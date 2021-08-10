const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const userInputs = require("./user.json");

//assertion style
chai.should();
chai.use(chaiHttp);

// Test cases for user registration
describe('POST /register', () => {
    it('givenValidData_shouldMake_POSTRequestAndRegisterUser', (done) => {
        let userData = userInputs.userCreate
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("User registered successfully");
                return done();
            });
    });

    it('givenInvalidFirstName_andOtherValidData_failsToRegisterUser', (done) => {
        let userData = userInputs.userCreateNegFirstName
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                return done();
            });
    });

    it('givenInvalidLastName_andOtherValidData_failsToRegisterUser', (done) => {
        let userData = userInputs.userCreateNegLastName
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                return done();
            });
    });

    it('givenInvalidEmail_andOtherValidData_failsToRegisterUser', (done) => {
        let userData = userInputs.userCreateNegEmail
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                return done();
            });
    });

    it('givenEmptyDataInPasswordField_andOtherValidData_failsToRegisterUser', (done) => {
        let userData = userInputs.userCreateNegPassword
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                return done();
            });
    });

// Test cases for user login
 describe('POST /login', () => {
    it('givenValidDataItShould_makePOSTRequestToLoginUser_andReturnTokenAndStatusCodeAs200', (done) => {
        let userData = userInputs.userLoginPos;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Login successful");
                res.body.should.have.property("token");
                return done();
            });
    });

    it('givenInvalidEmailItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userLoginNegEmail;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("User not found with email");
                return done();
            });
    });

    it('givenEmptyStringInPasswordItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs400', (done) => {
        let userData = userInputs.userLoginEmpPassword;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Wrong Password!");
                return done();
            });
    });

    it('givenIncorrectPasswordItShould_failToMakePOSTRequestToLoginUser_andReturnsStatusCodeAs401', (done) => {
        let userData = userInputs.userLoginNegPassword;
        chai.request(server)
            .post('/login')
            .send(userData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("Wrong Password!");
                return done();
             });
    });
});
});

// describe("POST - User Registration", () => {
//   it("givenValidData_shouldRegisterTheUser", (done) => {
//     const userDetails = userInput.registerUserPass;
//     chai
//       .request(server)
//       .post("/register")
//       .send(userDetails)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.a("object");
//         res.body.should.have.property("success").eql(true);
//         res.body.should.have
//           .property("message")
//           .eql("User registered successfully");
//         res.body.should.have.property("data").which.is.an("object");
//         err ? done(err) : done();
//       });
//   });

//   it("givenInValidData_when_shouldReturnError", (done) => {
//     const userDetails = userInput.registerUserFirstNameFail;
//     chai
//       .request(server)
//       .post("/register")
//       .send(userDetails)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a("object");
//         res.body.should.have.property("success").eql(false);
//         res.body.should.have
//           .property("message")
//           .eql(
//             '"firstName" with value "datta" fails to match the required pattern: /^[A-Z]{1}[a-z]{1,30}/' ||
//               "Some error occurred while adding user"
//           );
//         res.body.should.have.property("data").should.be.a("object");
//         err ? done(err) : done();
//       });
//   });
// });

// describe("POST - User Login", () => {
//   it("givenDetails_whenEmailAndPasswordAreValid_shouldLoginTheUserAndReturnToken", (done) => {
//     const userCredentials = userInput.userLoginPass;
//     chai
//       .request(server)
//       .post("/login")
//       .send(userCredentials)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("success").eql(true);
//         res.body.should.have.property("message").eql("Login successful");
//       });
//   });

//   it("givenDetails_whenInvalidEmailAndValidPassword_shouldReturnError", (done) => {
//     const userCredentials = userInput.loginWrongEmail;
//     chai
//       .request(server)
//       .post("/login")
//       .send(userCredentials)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a("object");
//         res.body.should.have.property("success").eql(false);
//         res.body.should.have
//           .property("message")
//           .eql("User not found with email");
//       });
//   });

//   it("givenDetails_whenValidEmailAndInValidPassword_shouldReturnError", (done) => {
//     const userCredentials = userInput.userLoginWrongPasswordFail;
//     chai
//       .request(server)
//       .post("/login")
//       .send(userCredentials)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a("object");
//         res.body.should.have.property("success").eql(false);
//         res.body.should.have.property("message").eql("Wrong password!");
//       });
//   });
// });

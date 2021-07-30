module.exports = (app) => {

    const userController = require('../controllers/user');

    // register new user
    app.post('/register', userController.registerUser);

    // user login
    app.post('/login', userController.loginUser);

//     // Create a new Note
//     app.post('/employees', employees.create);

//     // Retrieve all Notes
//     app.get('/employees', employees.findAll);

//     // Retrieve a single Note with noteId
//     app.get('/employees/:empId', employees.findOne);

//     // Update a Note with noteId
//     app.put('/employees/:empId', employees.update);

//     // Delete a Note with noteId
//     app.delete('/employees/:empId', employees.delete);
}

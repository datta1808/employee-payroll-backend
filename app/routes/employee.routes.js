module.exports = (app) => {
    const employees = require('../controllers/employee.controller.js');

    // Create a new Note
    app.post('/employees', employees.create);

    // Retrieve all Notes
    app.get('/employees', employees.findAll);

    // Retrieve a single Note with noteId
    app.get('/employees/:empId', employees.findOne);

    // Update a Note with noteId
    app.put('/employees/:empId', employees.update);

    // Delete a Note with noteId
    app.delete('/employees/:empId', employees.delete);
}

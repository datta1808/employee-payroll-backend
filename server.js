require("dotenv").config();

const express = require("express");

// Configuring the database
const dbConfig = require("./config/database.config.js");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

//Connecting to the database
dbConfig.databaseConnection();

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Employee Payroll application." });
});

// Require User routes
require("./app/routes/routes.js")(app);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 3000");
});

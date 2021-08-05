const mongoose = require("mongoose");

const logger = require('./logger');

exports.databaseConnection = () => {
  mongoose.Promise = global.Promise;

  // Connecting to the database
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      logger.error("Could not connect to the database.");
      process.exit();
    });
};

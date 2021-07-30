const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 'pre' acts as a middleware between userSchema & save() method
userSchema.pre('save', function (next) {

  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (err) return next(err);

    //assigning hashed password again to the current password
    this.password = hashedPassword;
    next();
  });
});


// createing a collection & assigning it to a constant
// collection name should be always singular
const userRegister = mongoose.model("RegisterUser", userSchema);


class Registration {
  // new user
  newUserRegistration = (newUser, callback) => {
    try {
      const user = new userRegister({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      });

      // save
      user.save({}, (err, data) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, data);
      });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message || "Some error occurred!",
          });
    }
  };

   // function for user login
   loginEmp(userCredentials, callback) {
    userRegister.findOne(
      { email: userCredentials.email },
      (err, data) => {
        if (err) return callback(err, null);
        else if (!data) return callback('User not found with email', null);
        return callback(null, data);
      }
    );
  }
}

module.exports = new Registration();

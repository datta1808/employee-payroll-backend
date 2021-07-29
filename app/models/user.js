const mongoose = require("mongoose");

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
}

module.exports = new Registration();

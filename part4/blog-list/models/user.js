const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    name: String,
  },
  {
    toJSON: {
      transform: (document, returnObject) => {
        returnObject.id = returnObject._id;
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
      },
    },
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;

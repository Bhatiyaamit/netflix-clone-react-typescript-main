const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"],
  },
  googleId: {
    type: String,
    default: null,
  },
  picture: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);

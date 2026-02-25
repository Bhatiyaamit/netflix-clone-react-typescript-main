const mongoose = require("mongoose");
require("dotenv").config();



exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database Connection established");
  } catch (err) {
    console.error("Database Error:", err.message);
    process.exit(1);
  }
};
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Failed to connect to the database", err);
    throw err;
  }
}

module.exports = connectDB;

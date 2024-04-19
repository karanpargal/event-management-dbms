const express = require("express");
const app = express();
const connectDB = require("./utils/functions/db");
const dotenv = require("dotenv");
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to backend of Event Management System!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

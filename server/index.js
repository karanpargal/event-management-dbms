const express = require("express");
const app = express();
const connectDB = require("./utils/functions/db");
const userRouter = require("./user/user.route");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to backend of Event Management System!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

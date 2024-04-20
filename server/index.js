const express = require("express");
const app = express();
const connectDB = require("./utils/functions/db");
const userRouter = require("./user/user.route");
const eventRouter = require("./event/event.route");
const feedbackRouter = require("./feedback/feedback.route");
const ticketRouter = require("./ticket/ticket.route");
const venueRouter = require("./venue/venue.route");
const categoryRouter = require("./category/category.route");
const notificationRouter = require("./notification/notification.route");
const cors = require("cors");
require("dotenv").config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/feedback", feedbackRouter);
app.use("/ticket", ticketRouter);
app.use("/venue", venueRouter);
app.use("/category", categoryRouter);
app.use("/notification", notificationRouter);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to backend of Event Management System!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

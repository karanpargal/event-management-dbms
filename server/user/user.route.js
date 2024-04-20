const express = require("express");
const userRouter = express.Router();
const userService = require("./user.service");

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userService.createUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    if (
      error.message === "User not found" ||
      error.message === "Invalid password"
    )
      return res.status(404).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const user = await userService.updateUserById(id, userData);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/participate", async (req, res) => {
  const { eventId, userId } = req.body;
  try {
    const user = await userService.participateEvent(userId,eventId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;

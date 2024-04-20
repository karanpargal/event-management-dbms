const User = require("./user.schema");
const Event = require("../event/event.schema");
const bcrypt = require("bcrypt");

async function createUser(username, email, password) {
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({ username, email, password: hashedPassword });
    return newUser;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email }).populate("events");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id).select("-password").populate("events");
    if (!user) {
      console.log("User not found");
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUserById(id, data) {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true }).select(
      "-password"
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUserById(id) {
  try {
    const user = await User.findByIdAndDelete(id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email }).populate("events");
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function participateEvent(userId, eventId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    console.log(user, event);
    user.events.push(eventId);
    event.participants.push(userId);
    await user.save();
    await event.save();
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  participateEvent,
};

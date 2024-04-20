const Event = require("./event.schema");
const mongoose = require("mongoose");

async function createEvent(
  title,
  description,
  startDate,
  endDate,
  venueId,
  categoryId,
  organizerId
) {
  try {
    const newEvent = await Event.create({
      title,
      description,
      startDate,
      endDate,
      venue: venueId,
      category: categoryId,
      organizer: organizerId,
    });
    return newEvent;
  } catch (error) {
    throw error;
  }
}

async function getAllEvents() {
  try {
    const events = await Event.find()
      .populate({
        path: "venue category organizer",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    return events;
  } catch (error) {
    throw error;
  }
}

async function getEventById(id) {
  try {
    const event = await Event.findById(id)
      .populate({
        path: "venue category organizer",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    return event;
  } catch (error) {
    throw error;
  }
}

async function updateEventById(id, data) {
  try {
    const event = await Event.findByIdAndUpdate(id, data, { new: true });
    return event;
  } catch (error) {
    throw error;
  }
}

async function deleteEventById(id) {
  try {
    const event = await Event.findByIdAndDelete(id);
    return event;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};

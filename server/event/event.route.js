const express = require("express");
const eventRouter = express.Router();
const eventService = require("./event.service");

eventRouter.post("/", async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    venueId,
    categoryId,
    organizerId,
  } = req.body;
  try {
    const event = await eventService.createEvent(
      title,
      description,
      startDate,
      endDate,
      venueId,
      categoryId,
      organizerId
    );
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

eventRouter.get("/", async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

eventRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventService.getEventById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

eventRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const eventData = req.body;
  try {
    const event = await eventService.updateEventById(id, eventData);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

eventRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventService.deleteEventById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = eventRouter;

const Venue = require("./venue.schema");

async function createVenue(name, address, capacity, description) {
  try {
    if (!name || !address || !capacity) {
      throw new Error("Missing required fields");
    }
    const newVenue = await Venue.create({
      name,
      address,
      capacity,
      description,
    });
    return newVenue;
  } catch (error) {
    throw error;
  }
}

async function getAllVenues() {
  try {
    const venues = await Venue.find();
    return venues;
  } catch (error) {
    throw error;
  }
}

async function getVenueById(id) {
  try {
    const venue = await Venue.findById(id);
    if (venue.length === 0) {
      throw new Error("Venue not found");
    }
    return venue;
  } catch (error) {
    throw error;
  }
}

async function updateVenueById(id, data) {
  try {
    const venue = await Venue.findByIdAndUpdate(id, data, { new: true });
    if (venue.length === 0) {
      throw new Error("Venue not found");
    }
    return venue;
  } catch (error) {
    throw error;
  }
}

async function deleteVenueById(id) {
  try {
    const venue = await Venue.findByIdAndDelete(id);
    if (venue.length === 0) {
      throw new Error("Venue not found");
    }
    return venue;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenueById,
  deleteVenueById,
};

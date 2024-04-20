const Feedback = require("./feedback.schema");

async function createFeedback(eventId, userId, rating, comment) {
  try {
    const newFeedback = await Feedback.create({
      event: eventId,
      user: userId,
      rating,
      comment,
    });
    return newFeedback;
  } catch (error) {
    throw error;
  }
}

async function getFeedbackById(id) {
  try {
    const feedback = await Feedback.findById(id);
    return feedback;
  } catch (error) {
    throw error;
  }
}

async function updateFeedbackById(id, data) {
  try {
    const feedback = await Feedback.findByIdAndUpdate(id, data, { new: true });
    return feedback;
  } catch (error) {
    throw error;
  }
}

async function deleteFeedbackById(id) {
  try {
    const feedback = await Feedback.findByIdAndDelete(id);
    return feedback;
  } catch (error) {
    throw error;
  }
}

async function getFeedbackByEventId(eventId) {
  try {
    const feedback = await Feedback.find({ event: eventId }).populate("user");
    return feedback;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
  getFeedbackByEventId,
};

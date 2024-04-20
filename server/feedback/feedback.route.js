const express = require('express');
const feedbackRouter = express.Router();
const feedbackService = require('./feedback.service');

feedbackRouter.post('/', async (req, res) => {
    const { eventId, userId, rating, comment } = req.body;
    try {
        const feedback = await feedbackService.createFeedback(eventId, userId, rating, comment);
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

feedbackRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await feedbackService.getFeedbackById(id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

feedbackRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const feedbackData = req.body;
    try {
        const feedback = await feedbackService.updateFeedbackById(id, feedbackData);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

feedbackRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const feedback = await feedbackService.deleteFeedbackById(id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

feedbackRouter.get('/event/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        const feedback = await feedbackService.getFeedbackByEventId(eventId);
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

module.exports = feedbackRouter;

const express = require('express');
const notificationRouter = express.Router();
const notificationService = require('./notification.service');

notificationRouter.post('/', async (req, res) => {
    const { userId, message } = req.body;
    try {
        const notification = await notificationService.createNotification(userId, message);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

notificationRouter.get('/', async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

notificationRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await notificationService.getNotificationById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

notificationRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const notificationData = req.body;
    try {
        const notification = await notificationService.updateNotificationById(id, notificationData);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

notificationRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await notificationService.deleteNotificationById(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = notificationRouter;

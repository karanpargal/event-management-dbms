const Notification = require('./notification.schema');

async function createNotification(userId, message) {
    try {
        const newNotification = await Notification.create({ user: userId, message });
        return newNotification;
    } catch (error) {
        throw error;
    }
}

async function getAllNotifications() {
    try {
        const notifications = await Notification.find();
        return notifications;
    } catch (error) {
        throw error;
    }
}

async function getNotificationById(id) {
    try {
        const notification = await Notification.findById(id);
        return notification;
    } catch (error) {
        throw error;
    }
}

async function updateNotificationById(id, data) {
    try {
        const notification = await Notification.findByIdAndUpdate(id, data, { new: true });
        return notification;
    } catch (error) {
        throw error;
    }
}

async function deleteNotificationById(id) {
    try {
        const notification = await Notification.findByIdAndDelete(id);
        return notification;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotificationById,
    deleteNotificationById,
};

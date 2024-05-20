import db from '../models/index.js';


export const createNotification = async (userId, bookingId, message) => {
    try {
        const getNewNotification = await db.Notification.create(userId, bookingId, message)
        return {
            err: 0,
            mes: 'Notification created successfully.',
            user: getNewNotification,
        }

    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}

export const getAllNotification = async () => {
    try {
        const Notification = await db.Notification.findAll();
        return Notification;

    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}
export const getNotificationById = async (notificationId) => {
    try {
        if (!notificationId) {
            throw new Error('Invalid notification ID');
        }
        const Notification = await db.Notification.findOne({ where: { id: notificationId } });
        return Notification;

    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}

export const updateNotification = async (notificationId, newData) => {
    try {
        const Notification = await db.Notification.findOne({ where: { id: notificationId } });
        if (!Notification) {
            throw new Error('booking not found');
        }

        await Notification.update(newData);

        return Notification;

    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}
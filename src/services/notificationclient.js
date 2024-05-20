import db from '../models/index.js';


export const createNotificationClinet = async (userId, bookingId, message) => {
    try {
        const getNewNotification = await db.NotificationClient.create(userId, bookingId, message)
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

export const getAllNotificationClient = async () => {
    try {
        const Notification = await db.NotificationClient.findAll();
        return Notification;

    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}
export const getNotificationByIdClient = async (notificationId) => {
    try {
        if (!notificationId) {
            throw new Error('Invalid notification ID');
        }
        const Notification = await db.NotificationClient.findOne({ where: { id: notificationId } });
        return Notification;

    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}

export const updateNotificationClient = async (notificationId, newData) => {
    try {
        const Notification = await db.NotificationClient.findOne({ where: { id: notificationId } });
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
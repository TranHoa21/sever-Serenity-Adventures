import * as services from '../services';
export const createNotification = async (req, res) => {
    const { userId, bookingId, message } = req.body

    try {
        const result = await services.createNotification({ userId, bookingId, message })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const updateNotification = async (req, res) => {
    const notificationId = req.params.id;
    const newData = req.body;

    try {
        const Notification = await services.updateNotification(notificationId, newData);

        res.status(200).json({ message: 'Updated booking information successfully', Notification });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}

export const getAllNotification = async (req, res) => {
    try {
        const notifications = await services.getAllNotification();
        res.json(notifications)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}
export const getNotificationById = async (req, res) => {
    try {
        const notificationId = req.params.id
        const notification = await services.getNotificationById(notificationId);
        res.json(notification)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}
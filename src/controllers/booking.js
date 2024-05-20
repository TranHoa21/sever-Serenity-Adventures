import * as services from '../services';

export const createNewBooking = async (req, res) => {
    const { userId, name, email, tour_name, start_day, total_amount, people, payment_status, phone_number } = req.body

    try {
        const result = await services.createNewBooking({ userId, name, email, tour_name, start_day, total_amount, people, payment_status, phone_number })
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const getAllBooking = async (req, res) => {
    try {
        const bookings = await services.getAllBooking();
        res.json(bookings)
    } catch (error) {
        console.log('check err >>>', error)
        return res.status(500).json({
            error: true,
            message: 'Error in server',

        })
    }
}

export const getBookingById = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const booking = await services.getBookingById(bookingId);
        res.json(booking)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const getBookingByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const booking = await services.getBookingByUserId(userId);
        res.json(booking)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const updateBooking = async (req, res) => {
    const bookingId = req.params.id;
    const newData = req.body;

    try {
        const booking = await services.updateBooking(bookingId, newData);

        res.status(200).json({ message: 'Updated booking information successfully', booking });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}

export const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        if (!bookingId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        await services.deletebooking(bookingId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: `Error deleting user by ID: ${error.message}` });
    }
}


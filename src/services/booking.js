import db from '../models/index.js';
import { io } from 'socket.io-client';
const socket = io('https://serenity-adventures-sever-demo.onrender.com/');

export const createNewBooking = async (userId, name, email, tour_name, start_day, total_amount, people, payment_status, phone_number) => {
    try {
        const getNewBooking = await db.Booking.create(userId, name, email, tour_name, start_day, total_amount, people, payment_status, phone_number)



        socket.emit('newBooking', getNewBooking);
        return {
            err: 0,
            mes: 'User created successfully.',
            booking: getNewBooking,
        }
    } catch (error) {
        console.log('check err >>>', error)
        throw error;
    }
}

export const getAllBooking = async () => {
    try {
        const allBookings = await db.Booking.findAll();
        const bookingData = allBookings.map(booking => ({
            id: booking.id,
            tour_name: booking.tour_name,
            name: booking.name,
            email: booking.email,
            booking_status: booking.booking_status,
            payment_status: booking.payment_status,
            start_day: booking.start_day,
            total_amount: booking.total_amount,
            createdAt: booking.createdAt
        }));
        return bookingData
    } catch (error) {
        console.log('check err >>>>', error);
        throw error;
    }
}

export const getBookingById = async (bookingId) => {
    try {
        if (!bookingId) {
            throw new Error('Invalid post ID');
        }
        const booking = await db.Booking.findOne({ where: { id: bookingId } });
        return booking;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Lỗi khi lấy bài viết theo ID: ${error.message}`);
    }
}

export const getBookingByUserId = async (userId) => {
    try {
        if (!userId) {
            throw new Error('Invalid post ID');
        }
        const booking = await db.Booking.findOne({ where: { id: userId } });
        return booking;
    } catch (error) {
        console.log('check err', error)

        throw new Error(`Lỗi khi lấy bài viết theo ID: ${error.message}`);
    }
}

export const updateBooking = async (bookingId, newData) => {
    try {
        const booking = await db.Booking.findOne({ where: { id: bookingId } });
        if (!booking) {
            throw new Error('booking not found');
        }

        await booking.update(newData);

        return booking;
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}

export const deletebooking = async (bookingId) => {
    try {
        const booking = await db.Booking.findOne({ where: { id: bookingId } });
        if (!booking) {
            throw new Error('Người dùng không tồn tại');
        }
        await booking.destroy();
    } catch (error) {
        console.log('check err >>>>', error);

        throw error;
    }
}


import express from 'express';
import initRouter from './src/routers';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from "http";
import { Server } from "socket.io";

require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['https://clinet-serenity-adventures.vercel.app', 'https://admin-serenity-adventures-2yw6gnlcv-tranhoa21s-projects.vercel.app'],
    credentials: true
}));

initRouter(app);
app.get('/', (req, res) => {
  res.send('server ready!')
})
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://clinet-serenity-adventures.vercel.app", "https://admin-serenity-adventures-2yw6gnlcv-tranhoa21s-projects.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
    },
});

const userSocketMap = {};
const conversations = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId !== "undefined" && userId) {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("newMessage", (data) => {
        const { receiverId, senderId, messageContent } = data;
        const receiverSocketId = userSocketMap[receiverId];

        const newMessage = {
            senderId: senderId,
            createdAt: new Date(),
            message: messageContent,
            unread: true,
        };

        if (!conversations[receiverId]) {
            conversations[receiverId] = {
                messages: [],
                unreadCounts: {}
            };
        }

        conversations[receiverId].messages.push(newMessage);

        if (!conversations[receiverId].unreadCounts[senderId]) {
            conversations[receiverId].unreadCounts[senderId] = 0;
        }
        conversations[receiverId].unreadCounts[senderId] += 1;

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } else {
            socket.broadcast.emit("newMessage", newMessage);
        }
    });

    socket.on("messageRead", ({ conversationId, userId }) => {
        if (conversations[conversationId] && conversations[conversationId].unreadCounts[userId] !== undefined) {
            conversations[conversationId].unreadCounts[userId] = 0;
            const readerSocketId = userSocketMap[userId];
            if (readerSocketId) {
                io.to(readerSocketId).emit("updateUnreadCount", {
                    conversationId: conversationId,
                    unreadCount: 0
                });
            }
        }
    });

    socket.on("disconnect", () => {
        const disconnectedUserId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        if (disconnectedUserId) {
            delete userSocketMap[disconnectedUserId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER_POSTGRE,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Có lỗi khi kết nối với cơ sở dữ liệu:', err);
        return;
    }
    console.log('Đã kết nối đến cơ sở dữ liệu!');
    release();
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
export { app, io, server };
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

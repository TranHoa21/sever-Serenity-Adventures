import { getReceiverSocketId, io } from "../../socket/socket.js";
import { Op } from 'sequelize';
import { createHash } from 'crypto';
import db from '../models/index.js';

// Hàm tạo conversationId mới
function generateConversationId(senderId, receiverId) {
    const sortedIds = [senderId, receiverId].sort((a, b) => a.localeCompare(b));
    const idString = sortedIds.join('');
    return createHash('sha256').update(idString).digest('hex');
}

export const getMessages = async (senderId, receiverId) => {
    try {
        const existingConversation = await db.Conversation.findOne({
            where: {
                [Op.or]: [
                    {
                        senderId: senderId,
                        receiverId: receiverId
                    },
                    {
                        senderId: receiverId,
                        receiverId: senderId
                    }
                ]
            }
        });

        let conversationId;
        if (existingConversation) {
            conversationId = existingConversation.conversationId;
        } else {
            conversationId = generateConversationId(senderId, receiverId);
            await db.Conversation.create({
                senderId: senderId,
                receiverId: receiverId,
                conversationId: conversationId
            });
        }

        const messages = await db.Message.findAll({
            where: { conversationId }
        });

        return messages;
    } catch (error) {
        console.error('Error in getMessages service:', error);
        throw new Error('Internal server error');
    }
};

export const sendMessage = async (senderId, receiverId, message) => {
    console.log("check mess server >>>", message);

    try {
        let conversation = await db.Conversation.findOne({
            where: {
                [Op.or]: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            }
        });

        if (!conversation) {
            const conversationId = generateConversationId(senderId, receiverId);
            conversation = await db.Conversation.create({
                senderId: senderId,
                receiverId: receiverId,
                conversationId: conversationId
            });
        }

        const conversationId = conversation.conversationId;

        const newMessage = await db.Message.create({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
            conversationId: conversationId
        });

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return newMessage;
    } catch (error) {
        console.log("Error in sendMessage service: ", error);
        throw new Error("Internal server error");
    }
};

export const getAllChatByUser = async (senderId) => {
    try {
        const conversations = await db.Conversation.findAll({
            where: {
                [Op.or]: [
                    { senderId: senderId },
                    { receiverId: senderId }
                ]
            }
        });

        const partnerIds = conversations.map(conversation => {
            return conversation.senderId === senderId ? conversation.receiverId : conversation.senderId;
        });
        const uniquePartnerIds = [...new Set(partnerIds)];

        return { partnerIds: uniquePartnerIds };
    } catch (error) {
        console.error("Error in getAllChatByUser service: ", error);
        throw error;
    }
};

export const updateMessage = async (messId, newData) => {
    try {
        const message = await db.Message.findOne({ where: { id: messId } });
        if (!message) {
            throw new Error('Message not found');
        }

        await message.update(newData);

        return message;
    } catch (error) {
        console.log('Error in updateMessage service:', error);
        throw error;
    }
};

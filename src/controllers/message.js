import * as services from '../services';

export const getMessages = async (req, res) => {
    try {


        const receiverId = req.params.id;
        const senderId = req.query.senderId;
        const messages = await services.getMessages(senderId, receiverId);

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error in getMessages controller:', error.message);
        res.status(500).json({ error: error.message });
    }
};
export const sendMessage = async (req, res) => {
    try {
        const message = req.body.content;
        const receiverId = req.params.id;
        const senderId = req.body.sender;

        const newMessage = await services.sendMessage(senderId, receiverId, message);
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllChatByUser = async (req, res) => {
    try {
        const senderId = req.params.id;
        const getChat = await services.getAllChatByUser(senderId);
        res.status(201).json(getChat);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const updateMessage = async (req, res) => {
    const messageId = req.params.id;
    const newData = req.body;

    try {
        const Message = await services.updateMessage(messageId, newData);

        res.status(200).json({ message: 'Updated booking information successfully', Message });
    } catch (error) {
        console.log('check err', error)
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
    }
}
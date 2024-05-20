const { Model } = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
    class Conversation extends Model {
        static associate(models) {
            // Mô hình quan hệ với Message
        }

        static generateConversationId(senderId, receiverId) {
            // Sắp xếp senderId và receiverId theo thứ tự số học
            const sortedIds = [senderId, receiverId].sort((a, b) => a - b);
            // Tạo chuỗi từ hai ID đã sắp xếp
            const idString = sortedIds.join('');
            // Sử dụng hàm hash để tạo conversationId từ chuỗi đã tạo
            return crypto.createHash('sha256').update(idString).digest('hex');
        }
    };

    Conversation.init({
        // Lưu trữ ID của người gửi và người nhận
        senderId: DataTypes.INTEGER,
        receiverId: DataTypes.INTEGER,
        // Các trường khác (nếu có)
        conversationId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Conversation',
        hooks: {
            beforeCreate: (conversation, options) => {
                if (!conversation.conversationId) {
                    conversation.conversationId = Conversation.generateConversationId(conversation.senderId, conversation.receiverId);
                }
            },
        }


    });

    return Conversation;
};

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
        }
    };
    Message.init({
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client: {
            type: DataTypes.BOOLEAN,
        },
        admin: {
            type: DataTypes.BOOLEAN,
        },
        conversationId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
};

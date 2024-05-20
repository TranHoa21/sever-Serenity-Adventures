const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {

        static associate(models) {
        }
    }
    Notification.init({
        userId: DataTypes.INTEGER,
        bookingId: DataTypes.INTEGER,
        message: DataTypes.STRING,
        status: DataTypes.BOOLEAN,

    }, {
        sequelize,
        modelName: 'Notification',
    });
    return Notification;
};

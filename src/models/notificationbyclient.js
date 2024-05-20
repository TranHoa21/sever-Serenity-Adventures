const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NotificationClient extends Model {

        static associate(models) {
        }
    }
    NotificationClient.init({
        userId: DataTypes.INTEGER,
        bookingId: DataTypes.INTEGER,
        message: DataTypes.STRING,
        status: DataTypes.BOOLEAN,

    }, {
        sequelize,
        modelName: 'NotificationClient',
    });
    return NotificationClient;
};

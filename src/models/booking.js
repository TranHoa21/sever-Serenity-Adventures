const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Booking.init({
        userId: DataTypes.INTEGER,
        tour_name: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        people: DataTypes.STRING,
        total_amount: DataTypes.STRING,
        payment_status: DataTypes.BOOLEAN,
        booking_status: DataTypes.ENUM('processing', 'confirmed', 'cancelled', 'completed'),
        start_day: DataTypes.DATE,
        end_day: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};

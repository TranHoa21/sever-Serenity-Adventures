const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Payment.init({
        booking_id: DataTypes.STRING,
        amount: DataTypes.STRING,
        payment_method: DataTypes.ENUM('đang xử lý', 'đã xác nhận', 'hủy', 'đã hoàn thành'),
        transaction_id: DataTypes.STRING,
        payment_status: DataTypes.ENUM('đang xử lý', 'đã xác nhận', 'hủy', 'đã hoàn thành'),
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
};

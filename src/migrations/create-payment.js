'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Payments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            booking_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            amount: {
                type: Sequelize.STRING

            },
            payment_method: {
                type: Sequelize.ENUM('đang xử lý', 'đã xác nhận', 'hủy', 'đã hoàn thành'),
                defaultValue: 'đang xử lý',
                allowNull: false
            },
            transaction_id: {
                type: Sequelize.STRING,

            },
            payment_status: {
                type: Sequelize.ENUM('đang xử lý', 'đã xác nhận', 'hủy', 'đã hoàn thành'),
                defaultValue: 'đang xử lý',
                allowNull: false
            },

        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Payments');
    }
};


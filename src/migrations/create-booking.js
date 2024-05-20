'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            tour_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING

            },
            email: {
                type: Sequelize.STRING,

            },
            phone_number: {
                type: Sequelize.STRING,
            },
            people: {
                type: Sequelize.STRING,
            },
            total_amount: {
                type: Sequelize.STRING,
            },
            booking_status: {
                type: Sequelize.ENUM('processing', 'confirmed', 'cancelled', 'completed'),
                defaultValue: 'processing',
                allowNull: false
            },
            payment_status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            start_day: {
                type: Sequelize.DATE,

            },
            end_day: {
                type: Sequelize.DATE,
            },

            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Bookings');
    }
};


'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tours', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            places_name: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Places',
                    key: 'name',
                },

            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,

            },
            description: {
                type: Sequelize.TEXT,

            },
            image: {
                type: DataTypes.STRING,
            },
            link: {
                type: DataTypes.STRING,

            },
            price: {
                type: DataTypes.STRING,

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
        await queryInterface.dropTable('Tours');
    }
};


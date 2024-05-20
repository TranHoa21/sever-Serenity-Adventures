'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT
            },
            image: {
                type: DataTypes.STRING
            },
            like: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            comment: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            author: {
                type: Sequelize.STRING
            },
            link: {
                type: DataTypes.STRING,

            },
            description: {
                type: DataTypes.STRING,

            },
            category: {
                type: Sequelize.STRING
            },
            publicationDate: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            tags: {
                type: Sequelize.STRING
            },
            Public: {
                type: Sequelize.BOOLEAN
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
        await queryInterface.dropTable('Posts');
    }
};
const { DataTypes} = require('sequelize');
const connection = require('../connection');

const User = connection.define('user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false,
    }
);

module.exports = User;
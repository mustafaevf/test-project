const { DataTypes} = require('sequelize');
const connection = require('../connection');

const Product = connection.define('product',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        created_at: {
            type: DataTypes.DATE,
        }
    },
    {
        timestamps: false,
    }
);

Product.getBooks = async (limit, offset) => {
    return await connection.query(`SELECT * FROM products LIMIT :limit OFFSET :offset`, {
        replacements: { limit: parseInt(limit), offset: parseInt(offset) },
        type: connection.QueryTypes.SELECT,
    });
}

module.exports = Product;
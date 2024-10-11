const Product = require('../models/product');
const User = require('../models/user');
const sequelize = require('../connection');
const { now } = require('sequelize/lib/utils');

exports.getProducts = async (request, response) => {
    try {
        const { offset, limit } = request.query; 
        let products;
        if (offset || limit) {
            const query = `SELECT * FROM products LIMIT :limit OFFSET :offset`;
            products = await sequelize.query(query, {
                replacements: { limit: parseInt(limit) || 10, offset: parseInt(offset) || 0 },
                type: sequelize.QueryTypes.SELECT,
            });
        } else {
            products = await Product.findAll();
        }
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

exports.getProduct = async (request, response) => {
    try {
        const id = request.params.id;
        const product = await Product.findByPk(id);
        response.status(200).json({product});
    } catch (error) {
        response.status(500).json({error});
    }
};

exports.deleteProduct = async (request, response) => {
    try {
        const id = request.params.id;
        console.log(id);
        const product = await Product.findByPk(id);
        product.destroy();
        response.status(200).json({message: id});
    } catch (error) {
        response.status(500).json({error});
    }
};

exports.updateProduct = async (request, response) => {
    try {
        const { data } = request.body;
        const id = request.params.id;
        // console.log(data);
        const product = await Product.findByPk(id);
        // console.log(product);
        await product.update(data);
        response.status(200).json({product});
    } catch (error) {
        response.status(500).json({error});
    }
};

exports.createProduct = async (request, response) => {
    try {
        const {title, price, userId} = request.body;
        console.log(request.body);
        // console.log(request);
        if(!title || !price || !userId) {
            return response.status(400).json({message: 'Fill'});
        }
        const user = await User.findByPk(userId);
        if(!user) {
            return response.status(400).json({message: 'User not founded'});
        }
        const product = await Product.create({title: title, price: price, user_id: parseInt(userId), created_at: now()});
        response.status(200).json({product});
    } catch (error) {
        console.log(error);
        response.status(500).json({error});
    }
};
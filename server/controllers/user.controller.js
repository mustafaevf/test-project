const User = require('../models/user');
const { now } = require('sequelize/lib/utils');

exports.getUsers = async (request, response) => {
    try {
        const { offset, limit } = request.query; 
        let users;
        if (offset || limit) {
            users = await User.getUsers(limit, offset);
        } else {
            users = await User.findAll();
        }
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

exports.getUser = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await User.findByPk(id);
        response.status(200).json({user});
    } catch (error) {
        response.status(500).json({error});
    }
};

exports.deleteUser = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await User.findByPk(id);
        user.destroy();
        response.status(200).json({message: id});
    } catch (error) {
        response.status(500).json({error});
    }
};

exports.updateUser = async (request, response) => {
    try {
        const { data } = request.body;
        const id = request.params.id;
        const user = await User.findByPk(id);
        await user.update(data);
        response.status(200).json({user});
    } catch (error) {
        response.status(500).json({error});
    }
};

exports.createUser = async (request, response) => {
    try {
        const {first_name, last_name} = request.body;
        if(!first_name || !last_name) {
            return response.status(401).json({message: 'fill'});
        }
        const user = await User.create({first_name: first_name, last_name: last_name, created_at: now()});
        response.status(200).json({user});
    } catch (error) {
        response.status(500).json({error});
    }
};
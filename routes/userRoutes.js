const express = require('express');
const userR = express.Router();

const { 
    createUser, 
    authUser, 
    getUsers, 
    getUserById, 
    getUserByEmail, 
    deleteUser, 
    updateUser } = require('../controllers/userController');

userR.get('/', getUsers);
userR.get('/:email', getUserByEmail);
userR.post('/register', createUser);
userR.post('/login', authUser);
userR.get('/id/:id', getUserById);
userR.delete('/:id', deleteUser);
userR.put('/:id', updateUser);

module.exports = userR;
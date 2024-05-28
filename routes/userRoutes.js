const express = require('express');
const userR = express.Router();

const { 
    createUser, 
    authUser, 
    getUsers, 
    getUserById, 
    getUserByEmail, 
    deleteUser, 
    updateUser 
} = require('../controllers/userController');

userR.get('/email/:email', getUserByEmail);
userR.get('/id/:id', getUserById);
userR.delete('/:id', deleteUser);
userR.put('/:id', updateUser);

userR.get("/", getUsers);
userR.post('/register', createUser);
userR.post('/login', authUser);

module.exports = userR;
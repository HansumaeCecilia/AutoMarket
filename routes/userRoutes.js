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

userR.get('/', async (req, res) => {
    try {
        const user = await getUsers(req, res);
        res.render('index', { user });
        console.log('GET request reseived for searched users:', user);
    } catch (error) {
        console.error ('Error rendering users:', error);
        res.status(500).send('Internal server error');
    }
});


//userR.get('/', getUsers);
userR.get('email/:email', getUserByEmail);
userR.post('/register', createUser);
userR.post('/login', authUser),
userR.get('/id/:id', getUserById),
userR.delete('/:id', deleteUser);
userR.put('/:id', updateUser);

module.exports = userR;
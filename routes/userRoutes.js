const express = require('express');
const { createUser, authUser, getUsers, getUserById, getUserByEmail, deleteUser, updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.get('/:email', getUserByEmail);
router.post('/register', createUser);
router.post('/login', authUser);
router.get('/id/:id', getUserById);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;
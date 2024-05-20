const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db')
const { createUser, findUserByEmail, findUserById } = require('../models/userModel');

// Generate JWT (json web token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'});
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name | !email | !password) {
        res.status(400);
        throw new Error('Please add all fields');    
    }    

    const userExists = await findUserByEmail(email);

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await createUser(name, email, hashedPassword);

    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }   
});

// Authenticate user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }    
});

module.exports = {
    registerUser,
    authUser,
};
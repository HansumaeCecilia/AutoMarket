const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

// Get all existing users from database
const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.users');
        console.log("Fetched users:", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
};

// Generate JWT (json web token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'});
};

// Register User
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
        res.status(400).send('User already exists');
        return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const result = await pool.query(
            'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );
        const user = result.rows[0];

        // Generate token
        const token = generateToken(user.id);
        
        // Test that token was generated
        console.log('Generated token:', token);

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error!');
    }  
};

// Authenticate user
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM public.users WHERE email = $1', [email]
        );
        const user = result.rows[0];
        
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal server error!');
    } 
};

// Get existing user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM public.users WHERE id = $1', [id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).send('Internal server error!');
    }
};

// Function for fetching user by email
const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).send('Internal server error');
    }
};

// Delete existing user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM public.users WHERE id = $1', [id]);
        res.send(`User with ID ${id} has been successfully deleted`);        
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal server error!');
    }
};

// Update existing user by ID
const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const result = await pool.query(
            'UPDATE public.users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING*', [name, email, hashedPassword, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal server error!');
    }
};

module.exports = {
    createUser,
    authUser,   
    getUsers,
    getUserById,
    getUserByEmail,
    deleteUser,
    updateUser, 
};
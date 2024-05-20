const pool = require('../db');

// Create new user
const createUser = async (name, email, password) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
};

// Find user by email
const findUserByEmail = async (email) => {
    const client = await pool.connect();
    try {
        const result = await client.queary('SELECT * FROM users WHERE email = $1', [email]);
    } finally {
        client.release();
    }
};

// Find user by ID
const findUserById = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.queary('SELECT * FROM users WHERE id = $1', [id]);
    } finally {
        client.release();
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
};
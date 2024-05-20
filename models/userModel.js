// const pool = require('../db');

// // Create new user
// const createUser = async (name, email, password) => {
//     const client = await pool.connect();
//     try {
//         const res = await client.query(
//             'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]
//         );
//         return res.rows[0];
//     } finally {
//         client.release();
//     }
// };

// // Find user by email
// const findUserByEmail = async (email) => {
//     const client = await pool.connect();
//     try {
//         const res = await client.query('SELECT * FROM public.users WHERE email = $1', [email]);
//         return res.rows[0];
//     } finally {
//         client.release();
//     }
// };

// module.exports = {
//     createUser,
//     findUserByEmail,           
// };
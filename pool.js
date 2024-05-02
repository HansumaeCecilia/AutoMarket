// pg Pool for PostgreSQL connection
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'Q2werty',
    port: 5432,
});

let test_word = 'word2'

pool.query('INSERT INTO public.test_table (test_column) VALUES ($1)', [test_word])
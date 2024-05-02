const Pool  = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'AutoMarket',
    password: 'Q2werty',
    port: '5432'
});


const express = require("express");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/items");

// pg Pool for PostgreSQL connection
// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'test',
//     password: 'Q2werty',
//     port: 5432,
// });

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/items", itemRoutes);

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});

// module.exports = { pool };

//let test_word = 'word3'

//pool.query('INSERT INTO public.test_table (test_column) VALUES ($1)', [test_word]);
// pool.query('DELETE FROM public.test_table WHERE test_column = \'word2\'');
// pool.query('SELECT FROM public.test_table', (error, result) => {
//   if (error) {
//     console.error('Error executing query:', error.stack);

//     return;
//   }

//   console.log(result.rows);
// });
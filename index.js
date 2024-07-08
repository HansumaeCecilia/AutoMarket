// MODULE AND LIBRARY IMPORTS
// ==========================

// Express-web engine
const express = require('express');
const exphbs = require('express-handlebars');

// Middleware for processing incoming HTTP request bodies
const bodyParser = require('body-parser');

// Module import for endpoints' response to client requests
const itemRoutes = require('./routes/items');

// Module import for user routes
const userRoutes = require('./routes/userRoutes');

// .env file loader
const dotenv = require('dotenv');

// Pool import for db connection and queries
const { pool } = require('./db'); 

// APP SETTINGS
// -----------------------------------------

// Load environment variables from .env file
dotenv.config();

// Create server
const app = express();
const port = process.env.PORT || 3000;

// Express middleware for parsing incoming requests
app.use(bodyParser.json());


app.use(express.static('public'));

// Routes to use functions
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// Engine settings
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Home page route
app.get('/', async (req, res) => {
  try {
    const brandQuery = 'SELECT brand_id, brand_name FROM car_brand';
    const modelQuery = 'SELECT brand_id, model_name FROM car_model';
    const brandResult = await pool.query(brandQuery);
    const modelResult = await pool.query(modelQuery);

    res.render('frontpage', {
      title: 'Search cars',
      car_brand: brandResult.rows,
      car_model: modelResult.rows
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error fetching data');
  }
});

app.get('/models', async (req, res) => {
  const brandId = req.query.brandId;
  if(!brandId) {
    return res.status(400).send('Brand ID is required');
  }

  try {
      const modelQuery = 'SELECT model_id, model_name FROM car_model WHERE brand_id = $1';
      const modelResult = await pool.query(modelQuery, [brandId]);
      res.json(modelResult.rows);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).send('Internal server error!');
  }
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
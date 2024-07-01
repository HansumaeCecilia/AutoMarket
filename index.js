// Express web engine
const express = require('express');
const exphbs = require('express-handlebars');
// Middleware for processing incoming HTTP request bodies
const bodyParser = require('body-parser');
// Module import for endpoints' response to client request
const itemRoutes = require('./routes/items');
// Module import for user routes
const userRoutes = require('./routes/userRoutes');

const dotenv = require('dotenv');
// Pool for database connection
const { pool } = require('./db');

// Load environment variables from .env file
dotenv.config();

// Create server
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Routes to functions
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// Engine settings
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Contact us page route
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Frontpage route
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


app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
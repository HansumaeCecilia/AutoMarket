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

const { pool } = require('./db');

dotenv.config();

// Create server
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use(express.static('public'));

app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// Engine settings
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Contact us page route
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/', async (req, res) => {
  try {
    const query = 'SELECT brand_id, brand_name FROM public.car_brand';
    const result = await pool.query(query);
    
    res.render('frontpage', {
      title: 'Search cars',
      car_brand: result.rows
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error fetching data');
  }
});


app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
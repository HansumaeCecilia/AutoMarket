// Express-web engine
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
// Middleware for processing incoming HTTP request bodies
const bodyParser = require('body-parser');
// Module import for endpoints' response to client requests
const itemRoutes = require('./routes/items');
// Module import for user routes
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

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
//app.set('views', path.join(__dirname, 'views'));

// Home page route
app.get('/', async (req, res) => {
  try {
    const brand = await pool.query('SELECT brand_id, brand_name FROM public.car_brand');
    const model = await pool.query('SELECT model_id, model_name FROM public.car_model');
    res.render('frontpage', { brand: brand.rows, model: model.rows });
  }  catch (error) {
    console.error(error);
    res.status(500).send('Server error!');
  }
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
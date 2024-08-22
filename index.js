// MODULE AND LIBRARY IMPORTS
// ==========================

// Express-web engine
const express = require('express');
const exphbs = require('express-handlebars');

// express-fileupload
const fileUpload = require('express-fileupload');

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
const { getVehicleById } = require('./controllers/items');

// APP SETTINGS
// -----------------------------------------

// Load environment variables from .env file
dotenv.config();

// Create server
const app = express();
const port = process.env.PORT || 3000;

// Express middleware for parsing incoming requests
app.use(bodyParser.json());
// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use express-fileupload for handling images
app.use(fileUpload());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes to use functions
app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// Engine settings
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Home page route and vehicle search options in dropdown
app.get('/', async (req, res) => {

  // Query for available brands, shown in the dropdown
  try {
    const brandQuery = 'SELECT brand_id, brand_name FROM car_brand ORDER BY brand_name ASC';
    const modelQuery = 'SELECT brand_id, model_name FROM car_model ORDER BY model_name ASC';
    const brandResult = await pool.query(brandQuery);
    const modelResult = await pool.query(modelQuery);

    // Render search form dropdown options on frontpage
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

// Get car models in ascending alphabetical order in the dropdown
app.get('/models', async (req, res) => {
  const brandIds = Array.isArray(req.query.brandIds) ? req.query.brandIds.map(id => parseInt(id, 10)) : [parseInt(req.query.brandIds, 10)];
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';
  
  if(brandIds.length === 0) {
    return res.status(400).send('At least one brand ID is required');
  }

  try {
      const modelQuery = `SELECT model_id, model_name FROM car_model WHERE brand_id = ANY($1) ORDER BY model_name ${order}`;
      const modelResult = await pool.query(modelQuery, [brandIds]);
      res.json(modelResult.rows);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).send('Internal server error!');
  }
});

// Result page for all listings
app.get('/listings', async (req, res) => {
  const listingsQuery = 'SELECT * FROM public.cars';
  const listingsResult = await pool.query(listingsQuery);

  res.render('listings', {
    title: 'All Listings',
    all_listings: listingsResult.rows
  });
});

// Contact page
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Fetch and render unique listing data dynamically
app.get('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await getVehicleById(id);

    if (vehicle) {
      let imageBase64 = null;

      if (vehicle.image) {
        imageBase64 = vehicle.image.toString('base64');
      }      

      res.render('listing', {
        title: `${vehicle.brand} ${vehicle.model}`, // Set information dynamically
        image: imageBase64,
        specs: `
              Price: ${vehicle.price}<br>
              Year: ${vehicle.model_year}<br>
              Mileage: ${vehicle.mileage}<br>
              Power: ${vehicle.power_type}<br>
              Gearbox: ${vehicle.gearbox_type}
        `,
        description: `${vehicle.description}`
      });
    } else {
      res.status(404).send('Vehicle not found');
    }
  } catch (error) {
    res.status(500).send('Server error!')
  }
});

// Fetch brands and models from database for adding new listings via form
app.get('/new_listing', async (req, res) => {
  try {
    const brandQuery = 'SELECT brand_id, brand_name FROM car_brand ORDER BY brand_name ASC';
    const modelQuery = 'SELECT brand_id, model_name FROM car_model ORDER BY model_name ASC';
    const brandResult = await pool.query(brandQuery);
    const modelResult = await pool.query(modelQuery);

    // Render form dropdown options on frontpage
    res.render('new_listing', {
      title: 'Add new vehicle',
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
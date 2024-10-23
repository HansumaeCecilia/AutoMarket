// Express web engine
const express = require('express');
const exphbs = require('express-handlebars');

// Middleware for processing incoming HTTP request bodies
const bodyParser = require('body-parser');

// Middleware for using  "post" and "delete" in html
const methodOverride = require('method-override')

// Module import for endpoints' response to client request
const itemRoutes = require('./routes/items');

// Module import for user routes
const userRoutes = require('./routes/userRoutes');

// .env file loader
const dotenv = require('dotenv');

// express-fileupload
const fileUpload = require('express-fileupload');

// cookie-parser for using localStorage and showing a pop-up notification
const cookieParser = require('cookie-parser');

const path = require('path');

// Create server
const app = express();
const port = process.env.PORT || 3000;

// i18next for translating
const i18next = require('i18next'); //Ladataan i18next kirjasto palvelinpuolelle
const i18nextMiddleware = require('i18next-express-middleware'); // i18next middleware Express palvelimelle
const Backend = require('i18next-fs-backend'); // Käytetään tiedostopohjaista backendia lataamaan käännökset tiedostosta

let i18nextInitialized = false; // Lippu, joka seuraa i18nextin alustusta

i18next
    .use(Backend)
    .init({
        lng: 'en',
        debug: false,
        backend: {
            loadPath: 'public/locales/{{lng}}/translation.json' //Määritetään käännöstiedostojen polku, missä {{lng}} korvataan valitulla kielellä
        },
        fallbackLng: 'en', // Jos käännöstä ei löydy, käytetään Englantia
    })
    .then(() => {
        console.log('i18next initialized successfully');
        console.log('Test translation:', i18next.t('search_vehicles1')); //Testikäännös
        i18nextInitialized = true; // Merkitään, että alustus on valmis
    })
    .catch(err => {
        console.error('i18next initialization error in the browser:', err);
    });

const hbs = exphbs.create({
  extname: '.handlebars', // Määritetään Handlebars-tiedostojen laajennus .handlebars
  helpers: {
      eq: function (a, b) {
          return a === b; // Helper-funktio, joka vertaa kahta arvoa
      },
      t: function (key) {
        return i18next.t(key); // Kutsutaan i18nextin käännöksiä suoraan handlebarsissa
      }
  }
});



// Pool for database connection
const { pool } = require('./db');
const { getVehicleById } = require('./controllers/items');
const { updateUser } = require('./controllers/userController');
//const { default: I18NextHttpBackend } = require('i18next-http-backend');

// Load environment variables from .env file
dotenv.config();




// Engine settings
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Use i18next fo traslation
app.use(i18nextMiddleware.handle(i18next));

// Express middleware for parsing incoming requests
app.use(bodyParser.json());
 // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(methodOverride('_method'));

// Use express-fileupload for handling images
app.use(fileUpload());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes to functions
app.use('/items', itemRoutes);
app.use('/users', userRoutes);





// Contact us page route
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Fetch and render unique listing data dynamically
app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Available helpers:', hbs.helpers);
  try {
    const vehicle = await getVehicleById(id);
    let showupdatePopUp = false;
    if (req.cookies.updateSuccess === 'true') {
      // if is, show deletePopUp
      showupdatePopUp = true;
      // after showing, delete cookie, so it doesn't show again
      res.clearCookie('updateSuccess');
    }
    if (vehicle) {
        let imageBase64 = null;
        if (vehicle.image) {
        imageBase64 = vehicle.image.toString('base64');
        } // Muunnetaan kuva base64-muotoon

      console.log(vehicle);
      res.render('listing', {
        id: vehicle.car_id,
        title: `${vehicle.brand_name} ${vehicle.model_name}`, // Set information dynamically
        image: imageBase64,
        specs: `
            <strong data-i18n="price"></strong> ${vehicle.price} <br>
            <strong data-i18n="model_year"></strong> ${vehicle.model_year} <br>
            <strong data-i18n="mileage"></strong> ${vehicle.mileage} <br>
            <strong data-i18n="power_type"></strong> <span data-i18n="power_types.${vehicle.power_type}"></span> <br>
            <strong data-i18n="gearbox_type"></strong> <span data-i18n="gearbox_types.${vehicle.gearbox_type}"></span> <br>
            ${vehicle.description}`,
        showupdatePopUp: showupdatePopUp,
      });
    } else {
      res.status(404).send('Vehicle not found');
    }
  } catch (error) {
    res.status(500).send('Server error!')
  }
});


// Frontpage route and brand&model search options in dropdown menu (alphabetical order)
app.get('/', async (req, res) => {
  try {
    const brandQuery = 'SELECT brand_id, brand_name FROM car_brand ORDER BY brand_name ASC';
    const modelQuery = 'SELECT brand_id, model_name FROM car_model ORDER BY model_name ASC';
    const brandResult = await pool.query(brandQuery);
    const modelResult = await pool.query(modelQuery);

    // check cookie: is item deleted successfully?
    let showdeletePopUp = false;
    if (req.cookies.deleteSuccess === 'true') {
      // if is, show deletePopUp
      showdeletePopUp = true;
      // after showing, delete cookie, so it doesn't show again
      res.clearCookie('deleteSuccess');
    };

    // Render search form dropdown options on frontpage
    res.render('frontpage', {
      title: 'Etusivu',
      car_brand: brandResult.rows,
      car_model: modelResult.rows,
      showdeletePopUp: showdeletePopUp
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error fetching data');
  }
});

// New listing route
app.get('/new_listing', async (req, res) => {
  try {
    const brandQuery = 'SELECT brand_id, brand_name FROM car_brand ORDER BY brand_name ASC';
    const modelQuery = 'SELECT brand_id, model_name FROM car_model ORDER BY model_name ASC';
    const brandResult = await pool.query(brandQuery);
    const modelResult = await pool.query(modelQuery);

    // Render search form dropdown options on frontpage
    res.render('new_listing', {
      title: 'Uusi ilmoitus',
      car_brand: brandResult.rows,
      car_model: modelResult.rows
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error fetching data');
  }
});

// Get car models in ascending alphabetical order
app.get('/models', async (req, res) => {
  const brandIds = Array.isArray(req.query.brandIds) ? req.query.brandIds.map(id => parseInt(id, 10)) : [parseInt(req.query.brandIds, 10)];
  const order = req.query.order === 'desc' ? 'DESC' : 'ASC';

  // If brand isn't selected, give error
  if(brandIds.length === 0) {
    return res.status(400).send('Brand ID is required');
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

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
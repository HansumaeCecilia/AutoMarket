// WEB SERVER FOR CAR LISTINGS

// LIBRARIES AND MODULES
// ---------------------

// Setting up Handlebars as view engine
const express = require('express');
// Express Handlebars as template engine
const {engine} = require('express-handlebars');
const path = require('path');

const app = express();

// Folder paths
app.use(express.static('public'));
app.set('views', './views');

// Engine settings
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Route to homepage
app.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Car Listings' });
});

// Create server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log('Server started and is listening to TCP port', PORT);
});
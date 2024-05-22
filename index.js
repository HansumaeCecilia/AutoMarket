// Express web engine
const express = require("express");
const exphbs = require('express-handlebars');
// Middleware for processing incoming HTTP request bodies
const bodyParser = require("body-parser");
// Module import for endpoints' response to client request
const itemRoutes = require("./routes/items");
// Module import for user routes
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

// Create server
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/items', itemRoutes);
app.use('/users', userRoutes);

// Engine settings
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
// Express-web engine
const express = require("express");

// Middleware for processing incoming HTTP request bodies
const bodyParser = require("body-parser");

// Module import for endpoints' response to client requests
const itemRoutes = require("./routes/items");

app.use(bodyParser.json());

app.use("/items", itemRoutes);

// Create server
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server started at port http://localhost:${port}`);
});
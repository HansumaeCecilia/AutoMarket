// MODULE FOR APP'S ENDPOINTS' RESPONSE TO CLIENT REQUESTS
// =======================================================

const express = require("express");
const router = express.Router();

// Imports from 'controllers'
const {
    //getItem,
    addItem,
    getItemId,
    deleteItem,
    updateItem,    
    searchVehicles,
} = require("../controllers/items");


// USE EXPRESS ROUTER TO USE 'CONTROLLERS' FUNCTIONS FOR DATA COMMUNICATION
router.get("/", async (req, res) => {    
    try {
        console.log('GET request received for searched items');  
        const items = await searchVehicles(req, res);
        res.render('index', { items });
    } catch (error) {
        console.error('Error rendering items:', error);
        res.status(500).send('Internal server error');
    }
});

router.get("/search", (req, res) => {
    console.log('GET request received for searching items with query:', req.query.q);
    searchVehicles(req, res);
});

router.post("/", (req, res) => {
    console.log('POST request received for adding an item');
    console.log('Received data:', req.body);
    addItem(req, res);
});

router.get("/:id", (req, res) => {
    console.log('GET request received for item with id:', req.params.id);
    getItemId(req, res);
});

router.delete("/:id", (req, res) => {
    console.log('DELETE request received for item with id:', req.params.id);
    deleteItem(req, res);
});

router.put("/:id", (req, res) => {
    console.log('PUT request received for item with id:', req.params.id);
    updateItem(req, res);
});

module.exports = router;
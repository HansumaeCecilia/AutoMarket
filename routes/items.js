// MODULE FOR APP'S ENDPOINTS' TO CLIENT REQUEST

const express = require("express");
const router = express.Router();

// Imports from 'controllers'
const {
    //getItem,
    addVehicle,
    getVehicleById,
    deleteVehicle,
    updateVehicle,
    searchVehicles
} = require("../controllers/items");

//USE EXPRESS ROUTER TO USE 'CONTROLLERS' FUNCTIONS FOR DATA COMMUNICATION
router.get("/", async (req, res) => {
    try {
        console.log('GET request received for searhed items');
        const items = await searchVehicles(req, res);
        res.render('index', { items });
    } catch (error) {
        console.error ('Error rendering items:', error);
        res.status(500).send('Internal server error');
    }
});

router.get("/search", (req, res) => {
    console.log('GET request received for searching items with query:', req.query.q);
    searchVehicles(req, res);
});

router.post("/", (req, res) => {
    console.log('POST request received for adding an item');
    console.log('Received data:', req.body); // Log received data from Postman
    addVehicle(req, res);
});

router.get("/:id", (req, res) => {
    console.log('GET request received for item with id:', req.params.id);
    getVehicleById(req, res);
});

router.delete("/:id", (req, res) => {
    console.log('DELETE request received for item with id:', req.params.id);
    deleteVehicle(req, res);
});

router.put("/:id", (req, res) => {
    console.log('PUT request received for item with id:', req.params.id);
    updateVehicle(req, res);
});

module.exports = router;
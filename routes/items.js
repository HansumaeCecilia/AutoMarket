// MODULE FOR APP'S ENDPOINTS' TO CLIENT REQUEST

const express = require("express");
const router = express.Router();

// Imports from 'controllers'
const {
    addVehicle,
    getVehicleById,
    deleteVehicle,
    updateVehicle,
    searchVehicles,
    getCarModels
} = require("../controllers/items");

// EXPRESS ROUTES TO USE '/controllers' FUNCTIONS
// ----------------------------------------------

// Fetch vehicles from front page
router.get('/search', async (req, res) => {
    try {
        await searchVehicles(req, res);
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).send('Internal server error');
    }
});

// Fetch vehicles from results-page
router.get('items/search', async (req, res) => {
    try {
        await searchVehicles(req, res);
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).send('Internal server error');
    }
});

// Route for getting car models based on selected brands
router.post('/items/get-car-models', async (req, res) => {
    try {
        console.log('Reseived brandIds:', req.body.brandIds);
        await getCarModels(req, res);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).send('Internal server error');
    }
});

// Router to adding a new vehicle
router.post("/", (req, res) => {
    console.log('POST request received for adding an item');
    console.log('Received data:', req.body); // Log received data from Postman
    addVehicle(req, res);
});

// Router to fetching vehicle by ID
router.get("/:id", (req, res) => {
    console.log('GET request received for item with id:', req.params.id);
    getVehicleById(req, res);
});

// Router for deleting vehicle by ID
router.delete("/:id", (req, res) => {
    console.log('DELETE request received for item with id:', req.params.id);
    deleteVehicle(req, res);
});

// Router to modifying vehicle information by ID
router.put("/:id", (req, res) => {
    console.log('PUT request received for item with id:', req.params.id);
    updateVehicle(req, res);
});

module.exports = router;
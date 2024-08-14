// MODULE FOR APP'S ENDPOINTS' RESPONSE TO CLIENT REQUESTS
// =======================================================

const express = require("express");
const router = express.Router();

// Imports from 'controllers'
const {        
    getVehicleById,
    deleteVehicle,
    updateVehicle,   
    searchVehicles,
    addVehicle
} = require("../controllers/items");


// EXPRESS ROUTERS TO USE '/controllers' FUNCTIONS
//------------------------------------------------

// Fetch vehicles from front page search
router.get('/search', async (req, res) => {
    try {
        console.log('GET request received for searching items with query:', req.query.q);
        await searchVehicles(req, res);
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).send('Internal server error');
    }
});

// Fetch vehicles from results-page
router.get('items/search', async (req, res) => {
    try {
        console.log('GET request received for searching with query:', req.query.q);
        await searchVehicles(req, res);
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).send('Internal server error.');
    }
});

router.get('/models', async (req, res) => {
    const brandId = req.query.brandId;
    if (!brandId) {
        return res.status(400).send('Brand ID is required');
    }

    try {
        const modelQuery = 'SELECT model_id, model_name FROM car_model WHERE brand_id = $1';
        const modelResult = await pool.query(modelQuery, [brandId]);
        res.json(modelResult.rows);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).send('Internal server error');
    }
});

// Router for adding a new vehicle
router.post("/", async (req, res) => {
    console.log('POST request received for adding an item');
    console.log('Received data:', req.body);

    // Required parameters for new vehicle listing
    const { brand_id, model_id, price, model_year, mileage, power_type, gearbox_type } = req.body;

    try {
        const result = await addVehicle(brand_id, model_id, price, model_year, mileage, power_type, gearbox_type);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }    
});

// Router for fetching vehicle by ID
router.get("/:id", (req, res) => {
    console.log('GET request received for item with id:', req.params.id);
    getVehicleById(req, res);
});

// Router for deleting vehicle by ID
router.delete("/:id", (req, res) => {
    console.log('DELETE request received for item with id:', req.params.id);
    deleteVehicle(req, res);
});

// Router for modifying vehicle information by ID
router.put("/:id", (req, res) => {
    console.log('PUT request received for item with id:', req.params.id);
    updateVehicle(req, res);
});

module.exports = router;
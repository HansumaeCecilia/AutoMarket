// MODULE FOR APP'S ENDPOINTS' TO CLIENT REQUEST

const express = require("express");
const router = express.Router();

// Imports from 'controllers'
const {
    addVehicle,
    getVehicleById,
    deleteVehicle,
    updateVehicle,
    searchVehicles
} = require("../controllers/items");

// EXPRESS ROUTES TO USE '/controllers' FUNCTIONS
// ----------------------------------------------

// Fetch vehicles from front page
router.get('/search', async (req, res) => {
    try {
        console.log('GET request received for searching items with query:', req.query);
        await searchVehicles(req, res);
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).send('Internal server error');
    }
});

// Fetch vehicles from results-page
router.get('/items/search', async (req, res) => {
    try {
        await searchVehicles(req, res);
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).send('Internal server error');
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


// Router to adding a new vehicle
router.post("/", async (req, res) => {
    console.log('POST request received for adding an item');
    console.log('Received data:', req.body); // Log received data from Postman
    
    // Required parameters for new vehicle listing
    const { brand_id, model_id, price, model_year, mileage, power_type, gearbox_type, description} = req.body;

    // Check if the image is sent
    const image = req.files ? req.files.image : null;

    try {
        const result = await addVehicle(brand_id, model_id, price, model_year, mileage, power_type, gearbox_type, description, image);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({error:error.message});
    }
});

// Router to fetching vehicle by ID
// router.get("/items/:id", async (req, res) => {
//     try {
//         console.log('GET request received for item with id:', req.params.id);
//         await getVehicleById(req, res);
//     } catch (error) {
//         console.error('Error searching vehicle:', error);
//         res.status(500).send('Internal server error');
//     }
// });

// // Router to fetching vehicle by ID
router.get("/items/:id", async (req, res) => {
    try {
        console.log('GET request received for item with id:', req.params.id);
        const vehicle = await getVehicleById(req.params.id);        
        res.json(vehicle); 
    } catch (error) {
        console.error('Error searching vehicle:', error);
        res.status(500).send('Internal server error');
    }
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
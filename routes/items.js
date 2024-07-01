// MODULE FOR APP'S ENDPOINTS' RESPONSE TO CLIENT REQUESTS
// =======================================================

const express = require("express");
const router = express.Router();

// Imports from 'controllers'
const {    
    addVehicle,
    getVehicleById,
    deleteVehicle,
    updateVehicle,    
    searchVehicles,        
} = require("../controllers/items");


// USE EXPRESS ROUTER TO USE 'CONTROLLERS' FUNCTIONS FOR DATA COMMUNICATION

// Front page GET-method for
// router.get("/", async (req, res) => {    
//     try {
//         const car_brands = await fetchCarBrands();
//         const car_models = await fetchCarModels();

//         res.render('frontpage', {
//             title: 'Search Cars',
//             c_brands: car_brands,
//             c_models: car_models,
//         });
//     } catch (error) {
//         console.error('Error rendering search form:', error);
//         res.status(500).send('Internal server error.');
//     }
// });

router.get('/search', async (req, res) => {
    try {
        console.log('GET request received for searching items with query:', req.query.q);
        await searchVehicles(req, res);
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('items/search', async (req, res) => {
    try {
        console.log('GET request received for searching with query:', req.query.q);
        await searchVehicles(req, res);
    } catch (error) {
        console.error('Error searching vehicles:', error);
        res.status(500).send('Internal server error.');
    }
});

router.post("/", (req, res) => {
    console.log('POST request received for adding an item');
    console.log('Received data:', req.body);
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
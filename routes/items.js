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
router.get("/", async (req, res) => {    
    try {
        console.log('GET request received for searched items', req.query.q);  
        await searchVehicles(req, res);        
    } catch (error) {
        console.error('Error rendering items:', error);
        res.status(500).send('Internal server error');
    }
});

// router.get("/search", async (req, res) => {
//     try {
//     console.log('GET request received for searching items with query:', req.query.q);
//     await searchVehicles(req, res);
//     } catch (error) {
//     console.error('Error rendering items:', error);
//     res.status(500).send('Internal server error!');
//     }    
// });

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
// MODULE FOR APP'S ENDPOINTS' TO CLIENT REQUEST

const express = require("express");
const router = express.Router();

// Imports from 'controllers'
const {
    getItem,
    addItem,
    getItemId,
    deleteItem,
    updateItem,
} = require("../controllers/items");

// USE EXPRESS ROUTER TO USE 'CONTROLLERS' FUNCTIONS FOR DATA COMMUNICATION
router.get("/", async (req, res) => {
    try {
    console.log('GET request received for all items');
    const items = await getItem(req, res);
    res.render ('./index', {items});
    } catch (error) {
    console.error ('Error fetching data', error);
    res.status(500).send('Internal server error');
}
});

router.post("/", (req, res) => {
    console.log('POST request received for adding an item');
    console.log('Received data:', req.body); // Log received data from Postman
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
const express = require("express");
const router = express.Router();
// const { v4 } = require("uuid");

// let itemData = [
//     {
//     "name": "Waffles",
//     "toppings": "strawberries",
//     "price": 200
//     }
// ];

// router.get("/", (req, res) => {
//     res.json(itemData);
// });

// router.post("/", (req, res) => {
//     const item = req.body;
//     itemData.push({ ...item, id: v4() });
//     res.send(`Item "${item.name}" has been added successfully`);
// });

// router.get("/:id", (req, res) => {
//     const { id } = req.params;
//     itemData = itemData.find((item) => item.id === id);
//     console.log(itemFound);
//     res.send(itemFound);
// })

// router.delete("/:id", (req, res) => {
//     const { id } = req.params;
//     itemData = itemData.filter((item) => item.id !== id);
//     console.log(itemData);
//     res.send(`Item with id ${id} has been deleted successfully`);
// });

// router.put("/:id", (req, res) => {
//     const { id } = req.params;
//     const { name, toppings, price } = req.body;

//     if (name) item.name = name;
//     if (toppings) item.toppings = toppings;
//     if (price) item.price = price;

//     res.send(
//         `Item with id { id } had been updated successfully`
//     );
// });

const {
    getItem,
    addItem,
    getItemId,
    deleteItem,
    updateItem,
} = require("../controllers/items");

router.get("/", (req, res) => {
    console.log('GET request received for all items');
    getItem(req, res);
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
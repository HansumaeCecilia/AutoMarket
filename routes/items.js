const express = require("express");
const router = express.Router();

const {
    getItem,
    addItem,
    getItemId,
    deleteItem,
    updateItem,
} = require("../controllers/items");

router.get("/", getItem);

router.post("/", addItem);

router.get("/", getItemId);

router.delete("/", deleteItem)

router.put("/", updateItem);

module.exports = router;
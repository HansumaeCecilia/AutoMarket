const { v4 } = require("uuid");

let itemData = [];

const getItem = (req, res) => {
    res.json(itemData);
};

const addItem = (req, res) => {
    const item = req.body;
    itemData.push({ ...item, id: v4() });
    res.send(`Item "${item.name}" has been added successfully.`);
};

const getItemId = (req, res) => {
    const { id } = req.params;
    const itemFound = itemData.find((item) => item.id === id);
    console.log(itemFound);
    res.send(itemFound); 
};

const deleteItem = (req, res) => {
    const { id } = req.params;
    itemData = itemData.filter((item) => item.id !== id);
    console.log(itemData);
    res.send(`Item with id ${id} has been deleted succeffully.`);
};

const updateItem = (req, res) => {
    const { id } = req.params;
    const { name, toppings, price } = req.body;

    const item = itemData.find((item) => item.id === id);

    if (name) item.name = name;
    if (toppings) item.toppings = toppings;
    if (price) item.price = price;

    res.send(
        `Item with id ${id} and name ${item.name} has been updated successfully`
    );
};

module.exports = {getItem, addItem, getItemId, deleteItem, updateItem};
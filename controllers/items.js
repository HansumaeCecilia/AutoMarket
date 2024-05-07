const { v4 } = require("uuid");
const { pool } = require('../db');


const getItem = async (req, res) => {
    //const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public.cars');
        res.json(result.rows);
    } catch (error) {
        console.error ('Error fetching data', error);
        res.status(500).send('Internal server error');
    }
};

const addItem = async (req, res) => {
    const { brand, model, price} = req.body;
    const itemId = v4();
    try {
        const result = await pool.query('INSERT INTO public.cars (brand, model, price) VALUES ($1, $2, $3) RETURNING *', [brand, model, price, itemId]);
        res.json(result.rows);
    } catch (error) {
        console.error ('Error adding item', error);
        res.status(500).send('Internal server error');
    }
};

const getItemId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public.cars WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Return the item found in the database
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        console.error('Error fetching ID:', error);
        res.status(500).send('Internal server error');
    }
};

const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM public.cars WHERE id = $1', [id]);
        res.send(`Item with ID ${id} has been successfully deleted`)
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal server error');
    }
  };

const updateItem = async (req, res) => {
    const { id } = req.params;
     try {
        await pool.query('UPDATE public.cars SET brand = $1, model = $2, price = $3, id = $4', [brand, model, price, id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Return the item found in the database
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal server error');
    }
    // const { brand, model, price } = req.body;

    // const item = itemData.find((item) => item.id === id);

    // if (brand) item.brand = brand;
    // if (model) item.model = model;
    // if (price) item.price = price;

    res.send(
        `Item with id ${id} has been updated successfully`
    );
};

module.exports = { getItem, addItem, getItemId, deleteItem, updateItem };
  
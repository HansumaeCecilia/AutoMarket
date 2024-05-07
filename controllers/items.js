// CRUD MODULE FOR POSTGRESQL DATABASE
// ===================================

// Generate unique ID
const { v4 } = require("uuid");
const { pool } = require('../db');

// Function for fetching data
const getItem = async (req, res) => {    
    try {
        const result = await pool.query('SELECT * FROM public.cars');
        res.json(result.rows);
    } catch (error) {
        console.error ('Error fetching data', error);
        res.status(500).send('Internal server error');
    }
};

// Function for adding data
const addItem = async (req, res) => {
    const { brand, model, price } = req.body;
    const itemId = v4();
    try {
        const result = await pool.query('INSERT INTO public.cars (id, brand, model, price) VALUES ($1, $2, $3, $4) RETURNING *', [itemId, brand, model, price]);
        res.json(result.rows);
    } catch (error) {
        console.error ('Error adding item', error);
        res.status(500).send('Internal server error');
    }
};

// Function for fetching item via ID
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

// Function for deleting item via ID
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

  // Function for updating item via ID
const updateItem = async (req, res) => {
    const { id } = req.params;
     try {
        await pool.query('UPDATE public.cars SET id = $4 brand = $1, model = $2, price = $3', [id, brand, model, price]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Return the item found in the database
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal server error');
    }

    res.send(
        `Item with id ${id} has been updated successfully`
    );
};

module.exports = { getItem, addItem, getItemId, deleteItem, updateItem };
  
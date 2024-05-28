// MODULE FOR POSTGRESQL DATABASE
// ------------------------------

// Generate unique ID

const { pool } = require('../db');

// // Function for fetching item via ID
// const getItem = async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM public.cars');
//         return result.rows;
//     } catch (error) {
//         console.error ('Error fetching data', error);
//         res.status(500).send('Internal server error');
//     }
// };

const getItem = async (req, res) => {
    const { Brand, Model, Price } = req.query;
    let query = 'SELECT * FROM public.cars WHERE 1=1';
    const queryParams = [];

    if (Brand) {
        query += ' AND brand ILIKE $' + (queryParams.length + 1);
        queryParams.push(`%${Brand}%`);
    }

    if (Model) {
        query += ' AND model ILIKE $' + (queryParams.length + 1);
        queryParams.push(`%${Model}%`);
    }

    if (Price) {
        if (isNaN(parseFloat(Price))) {
            console.error('Invalid price value:', Price);
            res.status(400).send('Invalid price value');
            return;
        }

        query += ' AND price::text ILIKE $' + (queryParams.length + 1);
        queryParams.push(`%${Price}%`);
    }

    try {
        const result = await pool.query(query, queryParams);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal server error');
    }
};

// Function for adding data
const addItem = async (req, res) => {
    const { brand, model, price} = req.body;
    try {
        const result = await pool.query('INSERT INTO public.cars (brand, model, price) VALUES ($1, $2, $3) RETURNING *', [brand, model, price]);
        res.json(result.rows);
    } catch (error) {
        console.error ('Error adding item', error);
        res.status(500).send('Internal server error');
    }
};

// Function for fetching item via ID
const getItemId = async (req, res) => {
    console.log(req.params)
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

// Function for deleting data via ID
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
    const { brand, model, price } = req.body;
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE public.cars SET brand = $1, model = $2, price = $3 WHERE id = $4 RETURNING *', [brand, model, price, id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal server error');
    }
};

// Vehicle search function
const searchItems = async (req, res) => {
    const query = `%${req.query.q}%`;
    try {
        const result = await pool.query(
            `SELECT * FROM public.cars WHERE
            brand ILIKE $1 OR
            model ILIKE $2 OT
            price::TEXT ILIKE $3`, [query, query, query]
        );
        console.log("Search results:", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("Error searching items:", error);
        res.status(500).send("Internal server error");
    }
};

module.exports = { getItem, addItem, getItemId, deleteItem, updateItem, searchItems };
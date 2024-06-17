// CRUD MODULE FOR POSTGRESQL DATABASE
// ===================================

// Generate unique ID

const { pool } = require('../db');

// // Function for fetching data
// const getItem = async (req, res) => {    
//     try {
//         const result = await pool.query('SELECT * FROM public.cars');
//         return result.rows;
//     } catch (error) {
//         console.error ('Error fetching data', error);
//         res.status(500).send('Internal server error');
//     }
// };

// const searchVehicles = async (req, res) => {
//     const { q, brand, model, price } = req.query;
//     let query = 'SELECT * FROM public.cars WHERE 1=1';
//     const queryParams = [];

//     if (q) {
//         const searchQuery = `%${q}%`;
//         query += ' AND (brand ILIKE $' + (queryParams.length + 1);
//         queryParams.push(searchQuery);
//         query += ' OR model ILIKE $' + (queryParams.length + 1);
//         queryParams.push(searchQuery);
//         query += ' OR price::TEXT ILIKE $' + (queryParams.length + 1) + ')';
//         queryParams.push(searchQuery);
//     } else {
//         if (brand) {
//             query += ' AND brand ILIKE $' + (queryParams.length + 1);
//             queryParams.push(`%${brand}%`);
//         }

//         if (model) {
//             query += ' AND model ILIKE $' + (queryParams.length + 1);
//             queryParams.push(`%${model}%`);
//         }

//         if (price) {
//             if (isNaN(parseFloat(price))) {
//                 console.error('Invalid price value:', price);
//                 res.status(400).send(`Invalid price value:', ${price}`);
//                 return;
//             }

//             query += ' AND price::TEXT ILIKE $' + (queryParams.length + 1);
//             queryParams.push(`%${price}`);
//         }
//     }

const searchVehicles = async (req, res) => {
    const { q, brand_name, model_name } = req.query;
    let query = 'SELECT * FROM public.car_brand WHERE 1=1';
    const queryParams = [];

    if (q) {
        const searchQuery = `%${q}%`;
        query += ' AND (brand_name ILIKE $' + (queryParams.length + 1);
        queryParams.push(searchQuery);
        query += ' OR model_name ILIKE $' + (queryParams.length + 1);
        queryParams.push(searchQuery);        
    } else {
        if (brand_name) {
            query += ' AND brand_name ILIKE $' + (queryParams.length + 1);
            queryParams.push(`%${brand_name}%`);
        }

        if (model_name) {
            query += ' AND model_name ILIKE $' + (queryParams.length + 1);
            queryParams.push(`%${model_name}%`);
        }        
    }

    try {
        console.log('Executing query:', query, queryParams);
        const result = await pool.query(query, queryParams);
        console.log('Search results:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal server error');
    }
};

// Function for adding data
// const addItem = async (req, res) => {
//     const { brand, model, price } = req.body;    
//     try {
//         const result = await pool.query('INSERT INTO public.cars (brand, model, price) VALUES ($1, $2, $3) RETURNING *', [brand, model, price]);
//         res.json(result.rows);
//     } catch (error) {
//         console.error ('Error adding item', error);
//         res.status(500).send('Internal server error!');
//     }
// };

const addVehicle = async (req, res) => {
    const { brand_name, model_name } = req.body;        

    try {
        // Insert brand into car_brand table
        const brandResult = await pool.query('INSERT INTO public.car_brand (brand_name) VALUES ($1) RETURNING brand_id', [brand_name]);
        const brandId = brandResult.rows[0].brand_id;

        // Insert model into car_model table via brand_id
        await pool.query('INSERT INTO public.car_model (model_name, brand_id) VALUES ($1, $2)', [model_name, brandId]);

        res.status(201).send('Vehicle added successfully');
    } catch (error) {
        console.error ('Error adding item', error);
        res.status(500).send('Internal server error!');
    }

    // try {
    //     const result = await pool.query('INSERT INTO public.car_brand (brand_name) VALUES ($1) RETURNING *', [brand_name]);
    //     res.json(result.rows);
    // } catch (error) {
    //     console.error ('Error adding item', error);
    //     res.status(500).send('Internal server error!');
    // }
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

module.exports = { addVehicle, getItemId, deleteItem, updateItem, searchVehicles };
  
// CRUD MODULE FOR POSTGRESQL DATABASE
// ===================================

// Generate unique ID

const { pool } = require('../db');


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

const addBrand = async (brand_name) => {
    try {
        // Check if the brand already exists
        const brandExists = await pool.query('SELECT brand_id FROM public.car_brand WHERE brand_name = $1', [brand_name]);

        if (brandExists.rows.length > 0) {
            // Brand already exists, return its ID
            return brandExists.rows[0].brand_id;
        }

        // Insert brand into car_brand table
        const brandResult = await pool.query('INSERT INTO public.car_brand (brand_name) VALUES ($1) RETURNING brand_id', [brand_name]);

        if (brandResult.rows.length === 0) {
            throw new Error('Failed to insert brand into car_brand');
        }

        // Return the newly inserted brand's ID
        return brandResult.rows[0].brand_id;
    } catch (error) {
        console.error('Error adding brand:', error);
        throw error;
    }
};

const addModel = async (brand_id, model_name) => {
    try {
        // Check if model already exists for the brand
        const modelExists = await pool.query('SELECT * FROM public.car_model WHERE brand_id = $1 AND model_name = $2', [brand_id, model_name]);

        if (modelExists.rows.length > 0) {
            throw new Error('Model already exists for this brand');
        }

        // Insert model into car_model table
        await pool.query('INSERT INTO public.car_model (model_name, brand_id) VALUES ($1, $2)', [model_name, brand_id]);

        // No need to check rowCount, assume successful insertion
        return 'Vehicle added successfully';
    } catch (error) {
        console.error('Error handling vehicle:', error);
        throw error;
    }
};
const addVehicle = async (req, res) => {
    const { brand_name, model_name } = req.body;

    console.log('Received parameters:', { brand_name, model_name });

    // Validate that all required parameters are present
    if (!brand_name || !model_name) {
        res.status(400).send('Missing required parameters: brand_name or model_name');
        return;
    }

    try {
        // Get or add the brand
        const brandId = await addBrand(brand_name);

        // Add model for the brand
        const result = await addModel(brandId, model_name);

        res.status(201).send(result);
    } catch (error) {
        console.error('Error adding vehicle:', error);
        res.status(500).send('Internal server error!');
    }
};


// const addVehicle = async (req, res) => {
//     const { brand_name, model_name } = req.body;        

//     try {
//         // Insert brand into car_brand table
//         const brandResult = await pool.query('INSERT INTO public.car_brand (brand_name) VALUES ($1) RETURNING brand_id', [brand_name]);

//         if (brandResult.rows.length === 0) {
//             throw new Error('Failed to insert brand into car_brand');
//         }

//         const brandId = brandResult.rows[0].brand_id;

//         // Insert model into car_model table via brand_id
//         const modelResult = await pool.query('INSERT INTO public.car_model (model_name, brand_id) VALUES ($1, $2)', [model_name, brandId]);

//         if (modelResult,rowCount === 0) {
//             throw new Error('Failed to insert model into car_model');
//         }

//         res.status(201).send('Vehicle added successfully');
//     } catch (error) {
//         console.error ('Error adding item', error);
//         res.status(500).send('Internal server error!');
//     }
// };

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
        res.send(`Item with ID ${id} has been successfully deleted`);
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

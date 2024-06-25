// CRUD MODULE FOR POSTGRESQL DATABASE
// ===================================

const { pool } = require('../db');

async function searchVehicles(req, res) {
    const brandIds = req.query.brandSelect ? (Array.isArray(req.query.brandSelect) ? req.query.brandSelect : [req.query.brandSelect]) : [];
    const modelIds = req.query.modelSelect ? (Array.isArray(req.query.modelSelect) ? req.query.modelSelect : [req.query.modelSelect]) : [];

    let query = `SELECT 
                    cb.brand_name,
                    cm.model_name
    FROM public.car_brand cb
    INNER JOIN public.car_model cm ON cb.brand_id = cm.brand_id
    WHERE 1=1`;
    const values = [];
    let index = 1;

    if (brandIds.length > 0) {
        query += ` AND cb.brand_id IN (${brandIds.map((id, i) => `$${index + i}`).join(', ')})`;
        values.push(...brandIds);
        index += brandIds.length;
    }

    if (modelIds.length > 0) {
        query += ` AND cm.model_id IN (${modelIds.map((id, i) => `$${index + i}`).join(', ')})`;
        values.push(...modelIds);
        index += modelIds.length;
    }

    try {
        const result = await pool.query(query, values);
        res.render('index', { items: result.rows });
    } catch (err) {
        console.error('Database query error', err);
        res.status(500).send('Internal server error');
    }
}

async function fetchCarBrands() {
    const query = 'SELECT brand_id, brand_name FROM car_brand';
    const result = await pool.query(query);
    return result.rows;
}

async function fetchCarModels() {
    const query = 'SELECT model_id, model_name FROM car_model';
    const result = await pool.query(query);
    return result.rows;
}

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

// Function for fetching item via ID
const getVehicleById = async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM public.car_brand WHERE brand_id = $1', [id]);
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
const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM public.car_brand WHERE brand_id = $1', [id]);
        res.send(`Item with ID ${id} has been successfully deleted`);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal server error');
    }
};

  // Function for updating item via ID
  const updateVehicle = async (req, res) => {
    const { brand_name, model_name } = req.body;
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE public.car_brand SET brand_name = $1, model_name = $2 WHERE brand_id = $3 RETURNING *', [brand_name, model_name, id]);        
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

module.exports = { addVehicle, getVehicleById, deleteVehicle, updateVehicle, searchVehicles, fetchCarBrands, fetchCarModels };

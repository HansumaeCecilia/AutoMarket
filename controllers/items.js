// CRUD MODULE FOR POSTGRESQL DATABASE
// ===================================

const { pool } = require('../db');

// Search vehicles from database using multiselection dropdown search
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

    // Show existing data for multi-selection
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

    // Fetch and render search results
    try {
        const brandQuery = 'SELECT brand_id, brand_name FROM car_brand ORDER BY brand_name ASC';
        const modelQuery = 'SELECT model_id, model_name FROM car_model';
        const brandResult = await pool.query(brandQuery);
        const modelResult = await pool.query(modelQuery);

        const result = await pool.query(query, values);

        res.render('results', {
            items: result.rows,
            car_brand: brandResult.rows,
            car_model: modelResult.rows
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

const addVehicle2 = async (brand, model, price, model_year, mileage, power_type, gearbox_type) => {
    try {
        // Query to retrieve brand_id
        const brandQuery = 'SELECT brand_id FROM car_brand WHERE brand_name = $1';
        const brandResult = await pool.query(brandQuery, [brand]);
        if (brandResult.rows.length === 0) {
            throw new Error(`Brand '${brand}' not found`);
        }
        const brand_id = brandResult.rows[0].brand_id;

        // Query to retrieve model_id
        const modelQuery = 'SELECT model_id FROM car_model WHERE model_name = $1';
        const modelResult = await pool.query(modelQuery, [model]);
        if (modelResult.rows.length === 0) {
            throw new Error(`Model '${model}' not found`);
        }
        const model_id = modelResult.rows[0].model_id;

        console.log('Inserting the new vehicle into the database');
        await pool.query('INSERT INTO public.cars (brand_id, model_id, brand, model, price, model_year, mileage, power_type, gearbox_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [ brand_id, model_id, brand, model, price, model_year, mileage, power_type, gearbox_type]);

        console.log('Vehicle added successfully:', brand, model);
        return 'Vehicle added successfully';
    } catch (error) {

        if (error.code === '23505') {
            console.log('Vehicle already exists:', brand, model);
            return 'Vehicle already exists'; 
        }
        console.error('Error handling vehicle:', error.message);
        console.error('Error stack:', error.stack);
        throw new Error(error.message);
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

module.exports = { getVehicleById, deleteVehicle, updateVehicle, searchVehicles, addVehicle2 };

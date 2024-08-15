// CRUD MODULE FOR POSTGRESQL DATABASE
// ===================================

const { pool } = require('../db');

// Search vehicles from database using multiselection dropdown search
async function searchVehicles(req, res) {
    const brandIds = req.query.brandSelect ? (Array.isArray(req.query.brandSelect) ? req.query.brandSelect : [req.query.brandSelect]) : [];
    const modelIds = req.query.modelSelect ? (Array.isArray(req.query.modelSelect) ? req.query.modelSelect : [req.query.modelSelect]) : [];
    const powerType = req.query.powerType ? (Array.isArray(req.query.powerType) ? req.query.powerType : [req.query.powerType]) : [];
    const gearboxType = req.query.gearboxType ? (Array.isArray(req.query.gearboxType) ? req.query.gearboxType : [req.query.gearboxType]) : [];

    // Variables to type into search form
    const { minPrice, maxPrice,  oldestYear, newestYear, minMileage, maxMileage } = req.query;

    // Search query for selected parameters
    let query = `SELECT 
            c.car_id,
            cb.brand_name,
            cm.model_name,
            c.price,
            c.model_year,
            c.mileage,
            c.power_type,
            c.gearbox_type
        FROM public.cars c
        INNER JOIN public.car_brand cb ON c.brand_id = cb.brand_id
        INNER JOIN public.car_model cm ON c.model_id = cm.model_id
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

    // Search by typing, show results based on vehicle data in database
    if (minPrice) {
        query += ` AND c.price >= $${index}`;
        values.push(parseFloat(minPrice));
        index += 1;
    }

    if (maxPrice) {
        query += ` AND c.price <= $${index}`;
        values.push(parseFloat(maxPrice));
        index += 1;
    }

    if (oldestYear) {
        query += ` AND c.model_year <= $${index}`;
        values.push(parseInt(oldestYear));
        index += 1;
    }

    if (newestYear) {
        query += ` AND c.model_year <= $${index}`;
        values.push(parseInt(newestYear));
        index += 1;
    }

    if (minMileage) {
        query += ` AND c.mileage <= $${index}`;
        values.push(parseInt(minMileage));
        index += 1;
    }

    if (maxMileage) {
        query += ` AND c.mileage <= $${index}`;
        values.push(parseInt(maxMileage));
        index += 1;
    }

    if (powerType.length > 0) {
        query += ` AND c.power_type IN (${powerType.map((type, i) => `$${index + i}`).join(', ')})`;
        values.push(...powerType);
        index += powerType.length;
    }

    if (gearboxType.length > 0) {
        query += ` AND c.gearbox_type IN (${gearboxType.map((type, i) => `$${index + i}`).join(', ')})`;
        values.push(...gearboxType);
        index += gearboxType.length;
    }

    // Fetch and render search results
    try {
        const brandQuery = 'SELECT brand_id, brand_name FROM car_brand ORDER BY brand_name ASC';
        const modelQuery = 'SELECT model_id, model_name FROM car_model ORDER BY model_name ASC';

        const brandResult = await pool.query(brandQuery);
        const modelResult = await pool.query(modelQuery);
        const result = await pool.query(query, values);

        res.render('results', {
            items: result.rows,
            car_brand: brandResult.rows,
            car_model: modelResult.rows,
        });
    } catch (err) {
        console.error('Error fetching vehicles:', err);
        res.status(500).send("Server error");
    }
};

// Function for adding new vehicle listings into database
const addVehicle = async (brand_id, model_id, price, model_year, mileage, power_type, gearbox_type) => {
    try {
        // Query to retrieve brand_id from vehicle database
        const brandResult = await pool.query('SELECT brand_name FROM car_brand WHERE brand_id = $1', [brand_id])        
        if (brandResult.rows.length === 0) {
            throw new Error(`Brand '${brand_id}' not found`);
        }
        const brand_name = brandResult.rows[0].brand_name;

        // Query to retrieve model_id from vehicle database
        const modelResult = await pool.query('SELECT model_name FROM car_model WHERE model_id = $1', [model_id])       
        if (modelResult.rows.length === 0) {
            throw new Error(`Model '${model_id}' not found`);
        }
        const model_name = modelResult.rows[0].model_name;        
        
        // Add new vehicle to database with required parameters
        await pool.query(`INSERT INTO public.cars 
            (brand_id, model_id, brand, model, price, model_year, mileage, power_type, gearbox_type) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [ brand_id, model_id, brand_name, model_name, price, model_year, mileage, power_type, gearbox_type]);

        console.log('Vehicle added successfully:', brand_name, model_name);
        return 'Vehicle added successfully';
    } catch (error) {

        // PostgreSQL error (23505) for breaking constraints
        if (error.code === '23505') {
            console.log('Vehicle already exists:', brand, model);
            return 'Vehicle already exists'; 
        }
        console.error('Error handling vehicle:', error.message);
        console.error('Error stack:', error.stack);
        throw new Error(error.message);
    }
};


// Function for fetching vehicle via ID
const getVehicleById = async (id) => {        
    try {
        const result = await pool.query('SELECT * FROM public.cars WHERE car_id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching vehicle by ID:', error);
        throw error;
    }
};

// // Function for fetching vehicle via ID
// const getListingById = async (req, res) => {
//     console.log(req.params)
//     const { id } = req.params;
//     try {
//         const result = await pool.query('SELECT * FROM public.cars WHERE car_id = $1', [id]);
//         if (result.rows.length > 0) {
//             res.json(result.rows[0]); // Return the item found in the database
//         } else {
//             res.status(404).send('Item not found');
//         }
//     } catch (error) {
//         console.error('Error fetching listing:', error);
//         res.status(500).send('Internal server error');
//     }
// };

// Function for deleting vehicle via ID
const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM public.cars WHERE car_id = $1', [id]);
        res.send(`Item with ID ${id} has been successfully deleted`);
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal server error');
    }
};

// Function for updating vehicle via ID
const updateVehicle = async (req, res) => {
    const { brand, model, price, model_year, mileage, power_type, gearbox_type } = req.body;
    const { id } = req.params;
    try {
        const result = await pool.query(`UPDATE public.cars SET 
            brand = $1, model = $2, price = $3, model_year = $4, 
            mileage = $5, power_type = $6, gearbox_type = $7 WHERE car_id = $8 RETURNING *`, 
            [brand, model, price, model_year, mileage, power_type, gearbox_type, id]);
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

module.exports = { getVehicleById, deleteVehicle, updateVehicle, searchVehicles, addVehicle };

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
    const { minPrice, maxPrice, oldestYear, newestYear, minMileage, maxMileage, idSearch } = req.query;

    // Search query for selected parameters
    let query = `SELECT 
            c.car_id,
            cb.brand_name,
            cm.model_name,
            c.price,
            c.model_year,
            c.mileage,
            c.power_type,
            c.gearbox_type,
            ci.image
        FROM public.cars c
        INNER JOIN public.car_brand cb ON c.brand_id = cb.brand_id
        INNER JOIN public.car_model cm ON c.model_id = cm.model_id
        LEFT JOIN public.car_images ci ON c.car_id = ci.car_id
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
        query += ` AND c.model_year >= $${index}`;
        values.push(parseInt(oldestYear));
        index += 1;
    }

    if (newestYear) {
        query += ` AND c.model_year <= $${index}`;
        values.push(parseInt(newestYear));
        index += 1;
    }

    if (minMileage) {
        query += ` AND c.mileage >= $${index}`;
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

    if (idSearch) {
        query += ` AND c.car_id = $${index}`;
        values.push(parseInt(idSearch));
        index += 1;
    }

    // Fetch and render search results
    try {
        const brandQuery = 'SELECT brand_id, brand_name FROM car_brand ORDER BY brand_name ASC';
        const modelQuery = 'SELECT model_id, model_name FROM car_model ORDER BY model_name ASC';

        const brandResult = await pool.query(brandQuery);
        const modelResult = await pool.query(modelQuery);
        const result = await pool.query(query, values);

        // Convert images to Base64
        const carsWithImages = result.rows.map(item => {
            if (item.image) {
                const base64Image = item.image.toString('base64');
                const mimeType = 'image/jpeg';
                item.image = `data:${mimeType};base64,${base64Image}`;
            }

            return item;
        });

        res.render('results', {
            items: carsWithImages,
            car_brand: brandResult.rows,
            car_model: modelResult.rows,
        });
    } catch (err) {
        console.error('Error fetching vehicles:', err);
        res.status(500).send("Server error");
    }
};

// Function for adding new vehicle listings into database
const addVehicle = async (brand_id, model_id, price, model_year, mileage, power_type, gearbox_type, description, image) => {
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

        console.log('Inserting the new vehicle into the database');

        // Add new vehicle to database with required parameters
        const result = await pool.query(`INSERT INTO public.cars 
            (brand, model, brand_id, model_id, price, model_year, mileage, power_type, gearbox_type, description) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING car_id`,
            [brand_name, model_name, brand_id, model_id, price, model_year, mileage, power_type, gearbox_type, description]);

        const carId = result.rows[0].car_id
        console.log('Vehicle added successfully:', brand_name, model_name);

        // Check if image has been uploaded
        if (image) {
            // Add to DB
            await pool.query('INSERT INTO car_images (car_id, image) VALUES ($1, $2)', [carId, image.data]);
            console.log('Image added successfully');

        } return { message: 'Cannot add vehicle',  id: carId}        
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
        const result = await pool.query(`SELECT cars.*, car_images.image FROM 
            public.cars LEFT JOIN car_images ON 
            cars.car_id = car_images.car_id WHERE 
            cars.car_id = $1`, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching vehicle by ID:', error);
        throw error;
    }
};

// Function for deleting vehicle via ID
const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM car_images WHERE car_id = $1', [id]);
        console.log(`Vehicle with ID ${id} has been successfully deleted`);

        if (result) {
            await pool.query('DELETE FROM cars WHERE car_id = $1', [id]);
            res.cookie('deleteSuccess', 'true', { maxAge: 60000, httpOnly: true });            
            return res.redirect(`/`);
        } else {
            console.log(`Error deleting image`);
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Function for updating vehicle via ID
const updateVehicle = async (req, res) => {
    // Destructure relevant fields from request body
    const { price, model_year, mileage, power_type, gearbox_type, description } = req.body;
    const { id } = req.params; // Get vehicle ID from request parameters

    // Initialize arrays to hold the fields to update and their corresponding values
    let updateFields = [];
    let values = [];
    let index = 1; // Start indexing for parameterized queries

    // Conditionally add parameters to the update fields if provided
    if (price) {
        updateFields.push(`price=$${index}`);
        values.push(price);
        index++;
    }

    if (model_year) {
        updateFields.push(`model_year=$${index}`)
        values.push(model_year);
        index++;
    }

    if (mileage) {
        updateFields.push(`mileage=$${index}`);
        values.push(mileage);
        index++;
    }

    if (power_type) {
        updateFields.push(`power_type=$${index}`);
        values.push(power_type);
        index++;
    }

    if (gearbox_type) {
        updateFields.push(`gearbox_type=$${index}`);
        values.push(gearbox_type);
        index++;
    }

    if (description) {
        updateFields.push(`description=$${index}`);
        values.push(description);
        index++;
    }

    if (req.files && req.files.image) {
        const image = req.files.image;
        const imageData = image.data;

        try {
            await updateOrInsertImage(id, imageData);
        } catch (error) {
            console.error('Error updating image:', error);
            return res.status(500).send('Failes to update image');
        }
    }

    // Add vehicle ID as final parameter for the WHERE clause
    values.push(id);

    // If no fields were provided to update in the cars table, skip the main update query
    if (updateFields.length === 0) {
        if (req.files?.image) {            
            return res.redirect(`/items/${id}`); // If fields updated, redirect back to listing
        } else {
            return res.status(400).send('No fields to update');
        }
    }

    // Dynamically construct SQL query based on fields to update
    const query = `UPDATE public.cars SET ${updateFields.join(', ')} WHERE car_id = $${index} RETURNING *`;
    console.log(query);

    try {
        // Execute query with values array
        const result = await pool.query(query, values);

        // If update was successful, redirect to updated vehicle's page
        if (result.rows.length > 0) {
            res.cookie('updateSuccess', 'true', { maxAge: 60000, httpOnly: true });
            console.log('Vehicle updated successfully');
            return res.redirect(`/items/${id}`);
        } else {
            res.status(404).send('Item not found')
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal Server Error!');
    }
};

// Function for image inserting/updating
const updateOrInsertImage = async (car_id, image) => {
    try {
        //Check if an image already exists
        const selectQuery = `SELECT * FROM car_images WHERE car_id = $1`;
        const selectResult = await pool.query(selectQuery, [car_id]);

        if (selectResult.rows.length > 0) {
            // If image exists, update it
            const updateQuery = `UPDATE car_images SET image = $2 WHERE car_id = $1`;
            const updateResult = await pool.query(updateQuery, [car_id, image]);
            return updateResult.rows[0];
        } else {
            // If no image exists, insert new one
            const insertQuery = `INSERT INTO car_images (car_id, image) VALUES ($1, $2) RETURNING *`;
            const insertresult = await pool.query(insertQuery, [car_id, image]);
            return insertresult.rows[0];
        }
    } catch (error) {
        console.error('Error inserting or updating image:', error);
        throw error;
    }
};

module.exports = { getVehicleById, deleteVehicle, updateVehicle, searchVehicles, addVehicle };

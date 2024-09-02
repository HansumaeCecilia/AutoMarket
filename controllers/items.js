// MODULE FOR POSTGRESQL DATABASE
// ------------------------------


const { pool } = require('../db');



// Async function for searching vehicles with multiselect dropdown
async function searchVehicles(req, res) {
    const brandIds = req.query.brandSelect ? (Array.isArray(req.query.brandSelect) ? req.query.brandSelect : [req.query.brandSelect]) : [];
    const modelIds = req.query.modelSelect ? (Array.isArray(req.query.modelSelect) ? req.query.modelSelect : [req.query.modelSelect]) : [];
    const powerType = req.query.powerType ? (Array.isArray(req.query.powerType) ? req.query.powerType : [req.query.powerType]) : [];
    const gearboxType = req.query.gearboxType ? (Array.isArray(req.query.gearboxType) ? req.query.gearboxType : [req.query.gearboxType]) : [];
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : null; 
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
    const minYear = req.query.minYear ? parseInt(req.query.minYear) : null;
    const maxYear = req.query.maxYear ? parseInt(req.query.maxYear) : null;
    const minMileage = req.query.minMileage ? parseInt(req.query.minMileage) : null;
    const maxMileage = req.query.maxMileage ? parseInt(req.query.maxMileage) : null;
    const idSearch = req.query.idSearch ? parseInt(req.query.idSearch) : null;


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
        WHERE 1=1`
    ;
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

    if (minPrice !== null) {
        query += ` AND c.price >= $${index}`;
        values.push(minPrice);
        index++;
    }

    if (maxPrice !== null) {
        query += ` AND c.price <= $${index}`;
        values.push(maxPrice);
        index++;
    }

    if (minYear !== null) {
        query += ` AND c.model_year >= $${index}`;
        values.push(minYear);
        index++;
    }

    if (maxYear !== null) {
        query += ` AND c.model_year <= $${index}`;
        values.push(maxYear);
        index++;
    }

    if (minMileage !== null) {
        query += ` AND c.mileage >= $${index}`;
        values.push(minMileage);
        index++;
    }

    if (maxMileage !== null) {
        query += ` AND c.mileage <= $${index}`;
        values.push(maxMileage);
        index++;
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

    if (idSearch !== null) {
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
        console.error('Database query error', err);
        res.status(500).send('Internal server error');
    }
};

const addVehicle = async (brand_id, model_id, price, model_year, mileage, power_type, gearbox_type, description, image) => {
    try {
        // Query to retrieve brand_id from vehicle database
        const brandResult = await pool.query('SELECT brand_name FROM car_brand WHERE brand_id = $1', [brand_id]);
        if (brandResult.rows.length === 0) {
            throw new Error(`Brand '${brand_id}' not found`);
        }
        const brand_name = brandResult.rows[0].brand_name;

        // Query to retrieve model_id from vehicle database
        const modelResult = await pool.query('SELECT model_name FROM car_model WHERE model_id = $1', [model_id]);
        if (modelResult.rows.length === 0) {
            throw new Error(`Model '${model_id}' not found`);
        }
        const model_name = modelResult.rows[0].model_name;

        console.log('Inserting the new vehicle into the database');

        // Add new vehicle to database with required parameters
        const result = await pool.query(`INSERT INTO public.cars 
            (brand_name, model_name, brand_id, model_id, price, model_year, mileage, power_type, gearbox_type, description) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING car_id`,
        [  brand_name, model_name, brand_id, model_id, price, model_year, mileage, power_type, gearbox_type, description]);

        const carId = result.rows[0].car_id;

        console.log('Vehicle added successfully:', brand_name, model_name);
        
        // Check if the image is uploaded
        if (image) {
            // Add it to the db
            await pool.query('INSERT INTO car_images (car_id, image) VALUES ($1, $2)', [carId, image.data]);
            console.log('Image added successfully');
        }        
        return { message: 'Uusi myynti-ilmoitus luotu onnistuneesti', id: carId };
    } catch (error) {

        // PostgreSQL error (23505) for breaking constraints
        if (error.code === '23505') {
            console.log('Vehicle already exists:', brand_name, model_name);
            return 'Vehicle already exists'; 
        }
        console.error('Error handling vehicle:', error.message);
        console.error('Error stack:', error.stack);
        throw new Error(error.message);
    }
};



// Function for fetching item via ID
const getVehicleById = async (id) => {

    try {
        const result = await pool.query(`SELECT cars.*, car_images.image 
            FROM public.cars 
            LEFT JOIN car_images ON cars.car_id = car_images.car_id 
            WHERE cars.car_id = $1`, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching ID:', error);
        throw error;
    }
};

// Function for deleting data via ID
const deleteVehicle = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`DELETE FROM car_images WHERE car_id = $1`, [id]);
            console.log(`Image with  car_id ${id} has been successfully deleted`);
        
        if (result) {
            await pool.query('DELETE FROM cars WHERE car_id = $1', [id]);
            //res.send(`Car with id ${id} has been successfully deleted`);
            return res.redirect('/');
            
        } else {
            console.log('Error deleting image')
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal server error');
    }
  };

// Function to update or insert an image in the car_images table
const updateOrInsertImage = async (car_id, image) => {
    try {
        // Tarkista onko kuva jo olemassa
        const selectQuery = `SELECT * FROM car_images WHERE car_id = $1`;
        const selectResult = await pool.query(selectQuery, [car_id]);

        if (selectResult.rows.length > 0) {
            // Jos kuva löytyy, päivitä se
            const updateQuery = `UPDATE car_images SET image = $2 WHERE car_id = $1 RETURNING *`;
            const updateResult = await pool.query(updateQuery, [car_id, image]);
            return updateResult.rows[0];
        } else {
            // Jos kuvaa ei löydy, lisää se
            const insertQuery = `INSERT INTO car_images (car_id, image) VALUES ($1, $2) RETURNING *`;
            const insertResult = await pool.query(insertQuery, [car_id, image]);
            return insertResult.rows[0];
        }
    } catch (error) {
        console.error('Error inserting or updating image:', error);
        throw error;
    }
};

// Function for updating item via ID
const updateVehicle = async (req, res) => {

    // Destructure relevant fields from request body
    const { price, model_year, mileage, power_type, gearbox_type, description } = req.body;
    const { id } = req.params; // Get vehicle ID from request parameters

    // Initialize arrays to hold the fields to update and their corresponding values
    let updateFields = [];
    let values = [];
    let index = 1;  // Start indexing for parameterized queries

    // conditionally add parameters to the update fields if provided
    if (price) {
        updateFields.push(`price=$${index}`);
        values.push(price);
        index++;
    }

    if (model_year) {
        updateFields.push(`model_year=$${index}`);
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

    // Kuvan käsittely
    if (req.files && req.files.image) {
        const image = req.files.image;
        const imageData = image.data;

        try {
            await updateOrInsertImage(id, imageData);
        } catch (error) {
            console.error('Error updating image:',error)
            return res.status(500).send('Failed to update image');
        }
    }

    // Add vehicle ID as final parameter for the WHERE clause
    values.push(id);

    // If no fields where provided to update, return 400 Bad Request response
    if (updateFields.length === 0) {
        if (req.files?.image) {
            return res.redirect(`/items/${id}`);
        } else {
        return res.status(400).send('No fields to update');
        }
    }

    // Dynamically construct SQL query based on fields to update
    const query = `UPDATE public.cars SET ${updateFields.join(', ')} WHERE car_id = $${index} RETURNING*`;

    try {

        // Execute query with values array
        const result = await pool.query(query, values);

        // If update was successful, redirect to updated vehicle's page
        if (result.rows.length > 0) {
            console.log('Vehicle updated successfully');
            return res.redirect(`/items/${id}`);
        } else {
            res.status(404).send('Item not found')
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal server error');
    }
};

module.exports = { addVehicle, getVehicleById, deleteVehicle, updateVehicle, searchVehicles};




//TODO: pop-up ilmoitukset
//TODO: filtteröinti (aakkosjärjestys, hinta, kilometrit)
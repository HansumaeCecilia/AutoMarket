// // Function to add a new brand
// const addBrand = async (brand_name) => {
//     try {
//         // Check if the brand already exists
//         const brandExists = await pool.query('SELECT * FROM public.car_brand WHERE brand_name = $1', [brand_name]);
        
//         if (brandExists.rows.length > 0) {
//             // Brand already exists
//             return null; // or throw an error, depending on your application logic
//         }

//         // Insert brand into car_brand table
//         const brandResult = await pool.query('INSERT INTO public.car_brand (brand_name) VALUES ($1) RETURNING brand_id', [brand_name]);

//         if (brandResult.rows.length === 0) {
//             throw new Error('Failed to insert brand into car_brand');
//         }

//         return brandResult.rows[0].brand_id;
//     } catch (error) {
//         console.error('Error adding brand:', error);
//         throw error;
//     }
// };

// // Function to add a new model for an existing brand
// const addModel = async (brand_id, model_name) => {
//     try {
//         // Check if the brand exists
//         const brandExists = await pool.query('SELECT * FROM public.car_brand WHERE brand_id = $1', [brand_id]);
        
//         if (brandExists.rows.length === 0) {
//             throw new Error('Brand does not exist');
//         }

//         // Check if the model already exists for this brand
//         const modelExists = await pool.query('SELECT * FROM public.car_model WHERE brand_id = $1 AND model_name = $2', [brand_id, model_name]);
        
//         if (modelExists.rows.length > 0) {
//             throw new Error('Model already exists for this brand');
//         }

//         // Insert model into car_model table
//         const modelResult = await pool.query('INSERT INTO public.car_model (model_name, brand_id) VALUES ($1, $2)', [model_name, brand_id]);

//         if (modelResult.rowCount === 0) {
//             throw new Error('Failed to insert model into car_model');
//         }

//         return 'Vehicle added successfully';
//     } catch (error) {
//         console.error('Error adding vehicle:', error);
//         throw error;
//     }
// };

// // Example usage:
// const addVehicle = async (req, res) => {
//     const { brand_name, model_name } = req.body;

//     try {
//         // Add new brand
//         const brandId = await addBrand(brand_name);

//         if (!brandId) {
//             res.status(400).send('Brand already exists');
//             return;
//         }

//         // Add model for the new or existing brand
//         const result = await addModel(brandId, model_name);

//         res.status(201).send(result);
//     } catch (error) {
//         console.error('Error adding vehicle:', error);
//         res.status(500).send('Internal server error!');
//     }
// };


// SECOND SHITTY ATTEMPT
// Add new brand
const addBrand = async (brand_name) => {
    try {
        const brandExists = await pool.query('SELECT brand_id FROM public.car_brand WHERE brand_name = $1', [brand_name]);

        if (brandExists.rows.length > 0) {
            // Brand already exists
            return brandExists.rows[0].brand_id;
        }

        // Insert brand into car_brand table
        const brandResult = await pool.query('INSERT INTO public.car_brand (brand_name) VALUES ($1) RETURNING brand_id', [brand_name]);

        if (brandResult.rows.length === 0) {
            throw new Error('Failed to insert brand into car_brand');
        }

        return brandResult.rows[0].brand_id;
    } catch (error) {
        console.error('Error adding brand:', error);
        throw error;
    }
};

// Funciton to add new model for an existing brand
// const addModel = async (brand_id, model_name) => {
//     try {
//         // Check if model already exists for the brand
//         const modelExists = await pool.query('SELECT * FROM  public.car_model WHERE brand_id = $1 AND model_name = $2', [brand_id, model_name]);

//         if (modelExists.rows.length > 0) {
//             throw new Error('Model already exists for this brand');
//         }

//         // Insert model into car_model table
//         const modelResult = await pool.query('INSERT INTO public.car_model (model_name, brand_id) VALUES ($1, $2)', [model_name, brand_id]);

//         if (modelResult.rowCount === 0) {
//             throw new Error('Model already exists for this brand');
//         }        

//         return 'Vehicle added successfully'
//     } catch (error) {
//         console.error('Error handling vehicle:', error);
//         throw error;
//     }
// };

// const addVehicle = async (req, res) => {
//     const { brand_name, model_name } = req.body;

//     console.log('Received parameters:', { brand_name, model_name });

//     // Validate that all required parameters are present
//     if (!brand_name || !model_name) {
//         res.status(400).send('Missing required parameters: brand_name or model_name');
//         return;
//     }


//     try {
//         // Get or add the brand
//         const brandId = await addBrand(brand_name);

//         // Add model for the brand
//         const result = await addModel(brandId, model_name);

//         res.status(201).send(result);
//     } catch (error) {
//         console.error('Error adding vehicle:', error);
//         res.status(500).send('Internal server error!');
//     }
// };
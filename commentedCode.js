// POSSIBLY USABLE CODE AS COMMENTS, NOT READY FOR DELETION
// ========================================================


// --------------------------------------------------------
// SEARCH VEHICLES!

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

// ----------------------------------------------------------------------------

// ===============================================
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
// ------------------------------------------------

//<h2>Users</h2>
{/* <ul>
{{#each user}}
<li>
  <strong>ID:</strong> {{this.id}} <br>
  <strong>Name:</strong> {{this.name}} <br>
  <strong>Email:</strong> {{this.email}} <br>
  <br>
</li>
{{/each}}
</ul> */}
//-------------------------------------------------

// const searchVehicles = async (req, res) => {
//     const { q, brand_name, model_name } = req.query;
//     let query = 'SELECT * FROM public.car_brand INNER JOIN car_model ON public.car_brand.brand_id = public.car_model.brand_id WHERE 1=1';
//     const queryParams = [];

//     if (q) {
//         const searchQuery = `%${q}%`;
//         query += ' AND (brand_name ILIKE $' + (queryParams.length + 1);
//         queryParams.push(searchQuery);
//         query += ' OR model_name ILIKE $' + (queryParams.length + 1);
//         queryParams.push(searchQuery);        
//     } else {
//         if (brand_name) {
//             query += ' AND brand_name ILIKE $' + (queryParams.length + 1);
//             queryParams.push(`%${brand_name}%`);
//         }

//         if (model_name) {
//             query += ' AND model_name ILIKE $' + (queryParams.length + 1);
//             queryParams.push(`%${model_name}%`);
//         }        
//     }

//     try {
//         console.log('Executing query:', query, queryParams);
//         const result = await pool.query(query, queryParams);
//         console.log('Search results:', result.rows);
//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Internal server error');
//     }
// };
//--------------------------------------------------

// // MULTISELECTION
// const searchVehicles = async (req, res) => {
//     const { brand_name, model_name } = req.query;
//     let query = `
//         SELECT * FROM  public.car_brand
//         INNER JOIN car_model
//         ON public.car_brand.brand_id = public.car_model.brand_id
//         WHERE 1=1`;
//     const queryParams = [];

//     if (brand_name && brand_name.length > 0) {
//         query += ` AND brand_name = ANY($${queryParams.length + 1})` ;
//         queryParams.push(brand_name);
//     }

//     if (model_name && model_name.length > 0) {
//         query += ` AND model_name = ANY($${queryParams.length + 1})` ;
//         queryParams.push(model_name);
//     }

//     try {
//         console.log('Executing query:', query, queryParams);
//         const result = await pool.query(query, queryParams);
//         console.log('Search results:', result.rows);
//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Internal server error');
//     }
// };
// --------------------------------------------------------

// CODE FOR ADDING BRANDS AND MODELS
// // Add new brand to vehicle database
// const addBrand = async (brand_name) => {
//     try {
//         // Check if the brand already exists
//         const brandExists = await pool.query('SELECT brand_id FROM public.car_brand WHERE brand_name = $1', [brand_name]);

//         if (brandExists.rows.length > 0) {
//             // Brand already exists, return its ID
//             return brandExists.rows[0].brand_id;
//         }

//         // Insert brand into car_brand table
//         const brandResult = await pool.query('INSERT INTO public.car_brand (brand_name) VALUES ($1) RETURNING brand_id', [brand_name]);

//         if (brandResult.rows.length === 0) {
//             throw new Error('Failed to insert brand into car_brand');
//         }

//         // Return the newly inserted brand's ID
//         return brandResult.rows[0].brand_id;
//     } catch (error) {
//         console.error('Error adding brand:', error);
//         throw error;
//     }
// };

// // jQuery to handle dynamic update of model dropdown based on selected brand

// //Add new model to vehicle database
// const addModel = async (brand_id, model_name) => {
//     try {
//         // Check if model already exists for the brand
//         const modelExists = await pool.query('SELECT * FROM public.car_model WHERE brand_id = $1 AND model_name = $2', [brand_id, model_name]);

//         if (modelExists.rows.length > 0) {
//             throw new Error('Model already exists for this brand');
//         }

//         // Insert model into car_model table
//         await pool.query('INSERT INTO public.car_model (model_name, brand_id) VALUES ($1, $2)', [model_name, brand_id]);

//         return 'Model added successfully';
//     } catch (error) {
//         console.error('Error handling vehicle:', error);
//         throw error;
//     }
// };
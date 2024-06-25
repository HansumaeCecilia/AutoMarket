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
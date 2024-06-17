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
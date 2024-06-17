// POSSIBLY USABLE CODE AS COMMENTS, NOT READY FOR DELETION
// ========================================================



// GET ITEMS FROM CARS TABLE
// -------------------------

// const getItem = async (req, res) => {
//     const { brand, model, price } = req.query;
//     let query = 'SELECT * FROM public.cars WHERE 1=1';
//     const queryParams = [];

//     if (brand) {
//         query += ' AND brand ILIKE $' + (queryParams.length + 1);
//         queryParams.push(`%${brand}%`);
//     }

//     if (model) {
//         query += ' AND model ILIKE $' + (queryParams.length + 1);
//         queryParams.push(`%${model}%`);
//     }

//     if (price) {
//         if (isNaN(parseFloat(price))) {
//             console.error('Invalid price value:', price);
//             res.status(400).send('Invalid price value');
//             return;
//         }

//         query += ' AND price::text ILIKE $' + (queryParams.length + 1);
//         queryParams.push(`%${price}%`);
//     }

//     try {
//         const result = await pool.query(query, queryParams);
//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Internal server error');
//     }
// };
// -----------------------------------------------------------------------------------------
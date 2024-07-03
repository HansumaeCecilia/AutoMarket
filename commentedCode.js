// POSSIBLY USABLE CODE AS COMMENTS, NOT READY FOR DELETION
// ========================================================

// const { searchVehicles } = require("./controllers/items")



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



// router.get("/", async (req, res) => {
//     try {
//         console.log('GET request received for all items');
//         const items = await getItem(req, res);
//         res.render ('index', { items });
//         await getItem(req, res);
//     } catch (error) {
//         console.error ('Error rendering items:', error);
//         res.status(500).send('Internal server error');
//     }})



// MULTISELECT
{/* <div class="container" style="margin-top: 50px;">
<div class="row">
    <div class="col-md-6"><div class="form-group col-sm-8" transform: translate(19px)>
<label for="multiselectBrand"></label>
<div id="multiselectBrand" class="multiselect">
<div id="mySelectLabel_multiselectBrand" class="selectBox" onclick="toggleCheckboxArea('multiselectBrand')">
<select class="form-select">
  <option>Merkki</option>
</select>
<div class="overSelect"></div>
</div>
<div id="mySelectOptions_multiselectBrand" style="display: none;">
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBrand')" value="Audi" /><span class="checkmark"></span>Audi</label>
  
   <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBrand')" value="Bugatti" /><span class="checkmark"></span>Bugatti</label>
  
<label class="checkbox">
    <input type="checkbox"  onchange="checkboxStatusChange('multiselectBrand')" value="Citroen" /><span class="checkmark"></span>Citroen</label>
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBrand')" value="Dacia" /><span class="checkmark"></span>Dacia</label>

  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBrand')" value="Honda" /><span class="checkmark"></span>Mazda</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBrand')" value="Nissan" /><span class="checkmark"></span>Nissan</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBrand')" value="Opel" /><span class="checkmark"></span>Opel</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBrand')" value="Seat" /><span class="checkmark"></span>Seat</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBrand')" value="Volkswagen" /><span class="checkmark"></span>Volkswagen</label>         
</div>
</div>
</div></div>
    <div class="col-md-6"><div class="form-group col-sm-8" transform: translate(19px)>
<label for="multiselectModel"></label>
<div id="multiselectModel" class="multiselect">
<div id="mySelectLabel_multiselectModel" class="selectBox" onclick="toggleCheckboxArea('multiselectModel')">
<select class="form-select">
  <option>Malli</option>
</select>
<div class="overSelect"></div>
</div>
<div id="mySelectOptions_multiselectModel" style="display: none;">
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectModel')" value="A8" /><span class="checkmark"></span>A8</label>
  
   <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectModel')" value="Veyron" /><span class="checkmark"></span>Veyron</label>
  
    <label class="checkbox">
    <input type="checkbox"  onchange="checkboxStatusChange('multiselectModel')" value="C3" /><span class="checkmark"></span>C3</label>
  
    <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectModel')" value="Duster" /><span class="checkmark"></span>Duster</label>

  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectModel')" value="Civic" /><span class="checkmark"></span>Civic</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectModel')" value="Micra" /><span class="checkmark"></span>Micra</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectModel')" value="Astra" /><span class="checkmark"></span>Astra</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectModel')" value="Ibiza" /><span class="checkmark"></span>Ibiza</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectModel')" value="Golf" /><span class="checkmark"></span>Golf</label>
</div>
</div>
</div></div>
</div>
</div>
<div class="container">
<div class="row">
    <div class="col-md-6"><div class="form-group col-sm-8" transform: translate(19px)>
<label for="multiselectBody"></label>
<div id="multiselectBody" class="multiselect">
<div id="mySelectLabel_multiselectBody" class="selectBox" onclick="toggleCheckboxArea('multiselectBody')">
<select class="form-select">
  <option>Korimalli</option>
</select>
<div class="overSelect"></div>
</div>
<div id="mySelectOptions_multiselectBody" style="display: none;">
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBody')" id="Porrasperä"  value="Porrasperä" /><span class="checkmark"></span>Porrasperä</label>
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBody')" id="Viistoperä"  value="Viistoperä" /><span class="checkmark"></span>Viistoperä</label>

  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBody')" id="Farmari"  value="Farmari" /><span class="checkmark"></span>Farmari</label>
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBody')" id="Coupé"  value="Coupé" /><span class="checkmark"></span>Coupé</label>
  
<label class="checkbox">
    <input type="checkbox" id="Pakettiauto" onchange="checkboxStatusChange('multiselectBody')" value="Pakettiauto" /><span class="checkmark"></span>Pakettiauto</label>
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectBody')" id="Avoauto"  value="Avoauto" /><span class="checkmark"></span>Avoauto</label>
  
<label class="checkbox">
    <input type="checkbox" id="Kuorma-auto" onchange="checkboxStatusChange('multiselectBody')" value="Kuorma-auto" /><span class="checkmark"></span>Kuorma-auto</label>

  <label class="checkbox">
    <input type="checkbox" id="Lava-auto" onchange="checkboxStatusChange('multiselectBody')" value="Lava-auto" /><span class="checkmark"></span>Lava-auto</label>
</div>
</div>
</div>

</div>
    <div class="col-md-6"><div class="form-group col-sm-8">
<label for="multiselectPower"></label>
<div id="multiselectPower" class="multiselect">
<div id="mySelectLabel_multiselectPower" class="selectBox" onclick="toggleCheckboxArea('multiselectPower')" >
<select class="form-select">
  <option>Käyttövoima</option>
</select>
<div class="overSelect"></div>
</div>
<div id="mySelectOptions_multiselectPower" style="display: none;">
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectPower')" 
    value="Bensa" /><span class="checkmark"></span>Bensa</label>
  
  
<label class="checkbox">
    <input type="checkbox"
    onchange="checkboxStatusChange('multiselectPower')"
    value="Diesel" /><span class="checkmark"></span>Diesel</label>
  
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectPower')" value="Sähkö" /><span class="checkmark"></span>Sähkö</label>
  
  <label class="checkbox">
     <input type="checkbox" onchange="checkboxStatusChange('multiselectPower')" value="Hybridi" /><span class="checkmark"></span>Hybridi</label>

  <label class="checkbox">
    <input type="checkbox" id="Muu" onchange="checkboxStatusChange('multiselectPower')" value="Muu" /><span class="checkmark"></span>Muu</label>
</div>
</div>
</div>

</div>
</div>
</div>
<div class="container">
<div class="row">
    <div class="col-md-6"><div class="form-group col-sm-8" transform: translate(19px)>
<label for="multiselectTransmission"></label>
<div id="multiselectTransmission" class="multiselect">
<div id="mySelectLabel_multiselectTransmission" class="selectBox" onclick="toggleCheckboxArea('multiselectTransmission')">
<select class="form-select">
  <option>Vaihteisto</option>
</select>
<div class="overSelect"></div>
</div>
<div id="mySelectOptions_multiselectTransmission" style="display: none;">
  
<label class="checkbox">
    <input type="checkbox" id="Manuaali" onchange="checkboxStatusChange('multiselectTransmission')" value="Manuaali" /><span class="checkmark"></span>Manuaali</label>
  
<label class="checkbox">
    <input type="checkbox" id="Automaatti" onchange="checkboxStatusChange('multiselectTransmission')" value="Automaatti" /><span class="checkmark"></span>Automaatti</label>
  
</div>
</div>
</div>

</div>
    <div class="col-md-6"><div class="form-group col-sm-8">
<label for="multiselectAccessories"></label>
<div id="multiselectAccessories" class="multiselect">
<div id="mySelectLabel_multiselectAccessories" class="selectBox" onclick="toggleCheckboxArea('multiselectAccessories')" >
<select class="form-select">
  <option>Varusteet</option>
</select>
<div class="overSelect"></div>
</div>
<div id="mySelectOptions_multiselectAccessories" style="display: none;">
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectAccessories')" value="Ilmastointi" /><span class="checkmark"></span>Ilmastointi</label>
  
<label class="checkbox">
    <input type="checkbox"  onchange="checkboxStatusChange('multiselectAccessories')" value="Lohkonlämmitin" /><span class="checkmark"></span>Lohkonlämmitin</label>
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectAccessories')" value="Lämmitettävä ohjauspyörä" /><span class="checkmark"></span>Lämmitettävä ohjauspyörä</label>

  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectAccessories')" value="Ohjaustehostin" /><span class="checkmark"></span>Ohjaustehostin</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectAccessories')" value="Navigointijärjestelmä" /><span class="checkmark"></span>Navigointijärjestelmä</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectAccessories')" value="Peruutuskamera" /><span class="checkmark"></span>Peruutuskamera</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectAccessories')" value="Keskuslukitus" /><span class="checkmark"></span>Keskuslukitus</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectAccessories')" value="Vakionopeudensäädin" /><span class="checkmark"></span>Vakionopeudensäädin</label>
</div>
</div>
</div>

</div>
</div>
</div>
<div class="container">
<div class="row">
    <div class="col-md-6"><div class="form-group col-sm-8">
<label for="multiselectColor"></label>
<div id="multiselectColor" class="multiselect">
<div id="mySelectLabel_multiselectColor" class="selectBox" onclick="toggleCheckboxArea('multiselectColor')" >
<select class="form-select">
  <option>Väri</option>
</select>
<div class="overSelect"></div>
</div>
<div id="mySelectOptions_multiselectColor" style="display: none;">
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectColor')" value="Musta" /><span class="checkmark"></span>Musta</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectColor')" value="Harmaa" /><span class="checkmark"></span>Harmaa</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectColor')" value="Valkoinen" /><span class="checkmark"></span>Valkoinen</label>

  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectColor')" value="Keltainen" /><span class="checkmark"></span>Keltainen</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectColor')" value="Sininen" /><span class="checkmark"></span>Sininen</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectColor')" value="Vihreä" /><span class="checkmark"></span>Vihreä</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectColor')" value="Punainen" /><span class="checkmark"></span>Punainen</label>
</div>
</div>
</div>

</div>
    <div class="col-md-6"><div class="form-group col-sm-8">
<label for="multiselectOther"></label>
<div id="multiselectOther" class="multiselect">
<div id="mySelectLabel_multiselectOther" class="selectBox" onclick="toggleCheckboxArea('multiselectOther')" >
<select class="form-select">
  <option>Muut</option>
</select>
<div class="overSelect"></div>
</div>
<div id="mySelectOptions_multiselectOther" style="display: none;">
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('myMultiselect')" value="Invalidivarustus" /><span class="checkmark"></span>Invalidivarustus</label>
  
<label class="checkbox">
    <input type="checkbox"  onchange="checkboxStatusChange('multiselectOther')" value="Monitoimiohjauspyörä" /><span class="checkmark"></span>Monitoimiohjauspyörä</label>
  
<label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectOther')" value="Kahdet renkaat" /><span class="checkmark"></span>Kahdet renkaat</label>

  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectOther')" value="Sadetunnistin" /><span class="checkmark"></span>Sadetunnistin</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectOther')" value="Huoltokirja" /><span class="checkmark"></span>Huoltokirja</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectOther')" value="Turbo" /><span class="checkmark"></span>Turbo</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectOther')" value="Vetokoukku" /><span class="checkmark"></span>Vetokoukku</label>
  
  <label class="checkbox">
    <input type="checkbox" onchange="checkboxStatusChange('multiselectOther')" value="Kattoluukku" /><span class="checkmark"></span>Kattoluukku</label>
</div>
</div>
</div> */}


// old searchVehicles
// ------------------

// const searchVehicles = async (req, res) => {
//     const { q, brand_name, model_name } = req.query;
//     let query = 'SELECT * FROM public.car_brand INNER JOIN public.car_model ON public.car_brand.brand_id = public.car_model.brand_id WHERE 1=1';
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
//         const result = await pool.query(query,queryParams);
//         console.log('Search results:', result.rows);
//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send('Internal server error');
//     }
// };


// // GET route for displaying search form
// router.get('/', async (req, res) => {
//     try {
//         // Fetch brands and models from database to populate the select options
//         const car_brands = await fetchCarBrands(); // Implement fetchCarBrands function
//         const car_models = await fetchCarModels(); // Implement fetchCarModels function

//         res.render('frontpage', {
//             title: 'Search Cars',
//             car_brand: car_brands, // Pass fetched car brands to the template
//             car_model: car_models, // Pass fetched car models to the template
//         });
//     } catch (error) {
//         console.error('Error rendering search form:', error);
//         res.status(500).send('Internal server error');
//     }
// });


//USE EXPRESS ROUTER TO USE 'CONTROLLERS' FUNCTIONS FOR DATA COMMUNICATION
// router.get("/", async (req, res) => {
//     try {
//         console.log('GET request received for searched items');
//         await searchVehicles(req, res); // Removed the assignment to items, as searchVehicles renders the response
//     } catch (error) {
//         console.error('Error rendering items:', error);
//         res.status(500).send('Internal server error');
//     }
// });

// router.get("/search", async (req, res) => {
//     try {
//         console.log('GET request received for searching items with query:', req.query.q);
//         await searchVehicles(req, res); // Removed the assignment to items, as searchVehicles renders the response
//     } catch (error) {
//         console.error('Error searching items:', error);
//         res.status(500).send('Internal server error');
//     }
// });

//USE EXPRESS ROUTER TO USE 'CONTROLLERS' FUNCTIONS FOR DATA COMMUNICATION
// router.get("/", async (req, res) => {
//     try {
//         console.log('GET request received for searhed items');
//         const items = await searchVehicles(req, res);
//         res.render('index', { items });
//     } catch (error) {
//         console.error ('Error rendering items:', error);
//         res.status(500).send('Internal server error');
//     }
// });

// router.get("/search", (req, res) => {
//     console.log('GET request received for searching items with query:', req.query.q);
//     searchVehicles(req, res);
// });



// <!-- JavaScript to handle dynamic model loading -->
// <script>
//   $(document).ready(function(){
//     // When brand selection changes
//     $('#brandSelect').change(function(){
//       // Get selected brans
//       var selectedBrands = $(this).val();
//       console.log('Selected brands:' selectedBrands); // log selected brands

//       // Make AJAX request to fetch models based on selected brands
//       $.ajax({
//         url: '/get-car-models', // Endpoint to get car models
//         method: 'POST', // HTTP method
//         data: JSON.stringify({ brandIds: selectedBrands }), // Data to send
//         contentType: 'application/json', // Data type
//         success: function(data) {  // On succes
//           console.log('Fetched models:' data); //log fetched models
//           var modelSelect = $('#modelSelect');
//           modelSelect.empty(); // Clear existing options
//           data.forEach(function(model) {
//             // Add new options to the models dropdown
//             modelSelect.append(new Option(model.model_name, model.model_id));
//           });
//         },
//         error: function(err) {  // On error
//           console.error('Error fetching models:', err);
//         }
//       });
//     });
//   });
// </script>
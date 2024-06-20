// // SEARCH FORM HANDLER
// // ===================

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('searchForm').addEventListener('submit', async function(e) {
//         e.preventDefault();    
//         const query = document.getElementById('searchQuery').value;
//         const selectedValues = $('multiselectSearch').val();

//         try {
//             let queryString = `?q=${encodeURIComponent(query)}`;

//             if (selectedValues && selectedValues.length > 0) {
//                 const brandQueryString = selectedValues.map(value => `brand=${encodeURIComponent(value)}`).join(',');
//                 queryString += `&${brandQueryString}`;
//             }

//             const response = await fetch(`/items/search?q=${queryString}`);
//             const results = await response.json();
//             displayResults(results);
//         } catch (error) {
//             console.log("Error fetching results:", error);
//         }
        
//          // Clear multi-selection dropdown after submitting
//          $('#multiselectSearch').multiselect('clearSelection');
//     });

//     function displayResults(results) {
//         const resultsContainer = document.getElementById('searchResults');
//         resultsContainer.innerHTML = '';

//         if (results.length === 0) {
//             resultsContainer.innerHTML = '<p>No vehicles found</p>';
//             return;
//         }

//         const list = document.createElement('ul');
//         list.className = 'list-group';

//         results.forEach(item => {
//             const listItem = document.createElement('li');
//             listItem.className = 'list-group-item';
//             listItem.textContent = `${item.brand} ${item.model} - $${item.price}`;
//             list.appendChild(listItem);
//         });

//         resultsContainer.appendChild(list);
//     }
// });
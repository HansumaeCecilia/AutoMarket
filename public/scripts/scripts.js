// APP SCRIPTS
// ===========

//Script for matching models with selected brands in vehicle search
$(document).ready(function() {

    const isAddVehicleForm = $('#addVehicleForm').length > 0;
    
    $('#brandSelect').select2({
        multiple: !isAddVehicleForm
    });

    $('#modelSelect').select2({
        multiple: !isAddVehicleForm
    });

    $('#powerType').select2({
        multiple: !isAddVehicleForm
    });

    $('#gearboxType').select2({
        multiple: !isAddVehicleForm
    });

    // Initially disabled the modelSelect dropdown
    $('#modelSelect').prop('disabled', true);

    $('#brandSelect').on('change', function() {
        const selectedBrandIds = $(this).val();

        if (selectedBrandIds && selectedBrandIds.length > 0) {
            $('#modelSelect').prop('disabled', false);
            fetchModels(selectedBrandIds, $('#sortOrder').val() || 'asc'); // Default sorting order
        } else {
            $('#modelSelect').prop('disabled', true);
        }
    });

    $('#sortOrder').on('change', function() {
        const selectedBrandIds = $('#brandSelect').val();
        const sortOrder = $(this).val();

        if (selectedBrandIds && selectedBrandIds.length > 0) {
            fetchModels(selectedBrandIds, sortOrder);
        }
    });

    function fetchModels(brandIds, sortOrder) {
        $.ajax({
            url: '/models',
            method: 'GET',
            data: { brandIds: brandIds, order: sortOrder },
            success: function(models) {
                const modelSelect = $('#modelSelect');
                modelSelect.empty();
                modelSelect.append($('<option>', {
                    value: '',
                    text: '',
                    selected: false
                }));

                $.each(models, function(index, model) {
                    modelSelect.append($('<option>', {
                        value: model.model_id,
                        text: model.model_name
                    }));
                });

                if(!isAddVehicleForm) {
                modelSelect.trigger('change');
                }
            },
            error: function(error) {
                console.error('Error fetching models:', error);
            }
        });
    };
});

// $(document).ready(function() {
//     $('#sortSelect').on('change', function() {
//         const sortOrder = $(this).val();
//             fetchListings(sortOrder);
//         });

//         function fetchListings(sortOrder) {
//             $.ajax({
//                 url: '/listings',
//                 method: 'GET',
//                 data: {sortOrder: sortOrder},
//                 success: function(listings) {
//                     const carList = $('#carList');
//                     carList.empty();
//                     $.each(listings, function(index, listings) {
//                         carList.append(`<div>${product.name} - ${product.price}€</div>`);
//                     });
//                 },
//                 error: function(error) {
//                     console.error('Error fetching listings:', error);
//                 }
//             });
//         }
//     });


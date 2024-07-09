// APP SCRIPTS
// ===========

// Script for matching models with selected brands in vehicle search dropdown
$(document).ready(function() {
    $('#brandSelect').select2();
    $('#modelSelect').select2();

    // Initially disable the modelSelect dropdown
    $('#modelSelect').prop('disabled', true);

    $('#brandSelect').on('change', function() {
        // Parse ID input syntax into integer
        const selectedBrandId = parseInt($(this).val(), 10);
        
        if (!isNaN(selectedBrandId) && selectedBrandId > 0) {
            $('#modelSelect').prop('disabled', false);
            fetchModels(selectedBrandId, $('#sortOrder').val() || 'asc'); // Default sorting order
        } else {
            $('#modelSelect').prop('disabled', true);
        }
    });

    $('#sortOrder').on('change', function() {
        const selectedBrandId = parseInt($('#brandSelect').val(), 10);
        const sortOrder = $(this).val();

        if (!isNaN(selectedBrandId) && selectedBrandId > 0) {
            fetchModels(selectedBrandId, sortOrder);
        }
    });

    function fetchModels(brandId, sortOrder) {
        $.ajax({
            url: '/models',
            method: 'GET',
            data: { brandId: brandId, order: sortOrder },
            success: function(models) {
                const modelSelect = $('#modelSelect');
                modelSelect.empty();
                $.each(models, function(index, model) {
                    modelSelect.append($('<option>', {
                        value: model.model_id,
                        text: model.model_name
                    }));
                });
                modelSelect.trigger('change');
            },
            error: function(error) {
                console.error('Error fetching models: ', error);
            }
        });
    }
});

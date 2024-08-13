// APP SCRIPTS
// ===========

//Script for matching models with selected brands in vehicle search
$(document).ready(function() {
    $('#brandSelect').select2({
        multiple: true
    });

    $('#modelSelect').select2({
        multiple: true
    });

    $('#powerType').select2({
        multiple: true
    });

    $('#gearboxType').select2({
        multiple: true
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
                $.each(models, function(index, model) {
                    modelSelect.append($('<option>', {
                        value: model.model_id,
                        text: model.model_name
                    }));
                });
                modelSelect.trigger('change');
            },
            error: function(error) {
                console.error('Error fetching models:', error);
            }
        });
    };
});
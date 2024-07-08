// APP SCRIPTS
// ===========

//Script for matching models with selected brands in vehicle search
$(document).ready(function() {
    $('#brandSelect').select2();
    $('#modelSelect').select2();

    $('#brandSelect').on('change', function() {
        const selectedBrandId = parseInt($(this).val(), 10);
        $.ajax({
            url: '/models',
            method: 'GET',
            data: { brandId: selectedBrandId },
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
    });
});
// $(function) is shorthand for $.ready(function)
// i.e. run 'function' once the page has loaded all elements
$(function() {

// On Submit
$('#eventForm').submit(function() {
    var output = {};
    
    // EVENT_FIELDS defined in eventdata.js contains all the fields of an event.
    $.each(EVENT_FIELDS, function(i, field) {
        // search for all visible controls with that field name.
        var fieldControls = $('[name='+field+']:visible');
        
        // if there is only one, its field value is merely the control's value.
        if (fieldControls.length == 1) {
            output[field] = fieldControls.val();
        }
        // if there are many (or 0), its field value is an array of the controls' values.
        else {
            
            output[field] = [];
            fieldControls.each(function(i, fieldControl) {
                output[field].push(fieldControl.val());
            });
        }
    });
    
    $('#output textarea').val(JSON.stringify(output));
    $('#output').show();
    return false;
});

// Populate Places dropdown
$.each(EVENT_PLACE, function(i, place) {
    $('#placeDropDown').append('<option>' + place + '</option>');
});

// 'Add Dependency' on click
$('#addDependencyButton').click(function() {
    $('#dependencyControls').append($('#dependencyControls > div:first').clone().show());
});

});

// Dependency delete button on click
function remove_dependency(elem) {
    $(elem).parent('.control-group').remove();
}

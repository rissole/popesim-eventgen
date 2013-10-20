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
                fieldControl = $(fieldControl);
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

// Populate Stats dropdown
$.each(EVENT_STATS, function(i, stat) {
	$('#prereqStatDropDown').append('<option>' + stat + '</option');
	$('#effectStatDropDown').append('<option>' + stat + '</option');
});

// 'Add Dependency' on click
$('#addDependencyButton').click(function() {
    $('#dependencyControls').append($('#dependencyControls > div:first').clone().show());
});

// 'Add Response' on click
$('#addResponseButton').click(function() {
    $('#responseControls').append($('#responseControls > div:first').clone().show());
});

// Disable other dropdowns when the stat dropdown equals 'Game Over'
$('#prereqStatDropDown').on('change', function(){
	var dropDownVal = $('#prereqStatDropDown').val();
	if(dropDownVal == "GameOver" || dropDownVal == "None")
	{
		$('#prereqModDropDown').prop('disabled', true);
		$('#prereqStatAmount').prop('disabled', true);
	}
	else if($('#prereqModDropDown').is(':disabled'))
	{
		$('#prereqModDropDown').prop('disabled', false);
		$('#prereqStatAmount').prop('disabled', false);
	}
}); 
});

// Control delete button on click
function remove_control(elem) {
    $(elem).parent('.control-group').remove();
}

// Add Effect Group on click
function add_effect_group(elem) {
    $(elem).siblings('.effectGroupControls').append($(elem).siblings('.effectGroupControls').find('div[name=effectgroup]:first').clone().show());
}

// Add Effect on click
function add_effect(elem) {
    $(elem).siblings('.effectControls').append($(elem).siblings('.effectControls').find('div[name=effect]:first').clone().show());
}

// Add Stat on click
function add_stat(elem) {
    $(elem).siblings('.statControls').append($(elem).siblings('.statControls').find('div[name=stat]:first').clone().show());
}
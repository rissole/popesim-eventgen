// $(function) is shorthand for $.ready(function)
// i.e. run 'function' once the page has loaded all elements
$(function() {

// On Submit
$('#eventForm').submit(function() {
	// EVENT_FIELDS defined in eventdata.js contains all the fields of an event.
    var output = populate_object_values(EVENT_FIELDS, null);
    output['responses'] = gather_responses();
    $('#output textarea').val(JSON.stringify(output, null, '\t'));
    $('#output').show();
    return false;
});

// Populate Places dropdown
$.each(EVENT_PLACE, function(i, place) {
    $('#placeDropDown').append('<option>' + place + '</option>');
});

// Populate Stats dropdown
$.each(EVENT_STATS, function(i, stat) {
	$('#prereqStatDropDown').append('<option>' + stat + '</option>');
	$('#effectStatDropDown').append('<option>' + stat + '</option>');
});


// Special case, effect has a chance of ending the game as well
$('#effectStatDropDown').append('<option>GameOver</option>');

// 'Add Dependency' on click
$('#addDependencyButton').click(function() {
    $('#dependencyControls').append($('#dependencyControls > div:first').clone().show());
});

// 'Add Response' on click
$('#addResponseButton').click(function() {
    $('#responseControls').append($('#responseControls > div:first').clone().show());
});

// Disable other dropdowns when the prerequisite stat dropdown equals 'None'
$('#prereqStatDropDown').on('change', function(){
	var dropDownVal = $('#prereqStatDropDown').val();
	if(dropDownVal == "None")
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

// Finds and creates all responses
function gather_responses()
{
	var responses = [];
	var responseControls = $('[name="responsegroup"]:visible');
	for(var i = 0; i < responseControls.length; i++)
	{
		responses[i] = make_response(responseControls[i]);
	}
	return responses;
}

// Make an event response
function make_response(elem)
{
	var response = populate_object_values(RESPONSE_FIELDS, elem);
	response["effectchains"] = gather_effect_groups(elem);
	return response;
}

// Finds and creates all the effect groups for a given response
function gather_effect_groups(response)
{
	var output = [];
	var input = $(response).find('[name="effectgroup"]:visible');
	for(var i = 0; i < input.length; i++)
	{
		output[i] = make_effect_group(input[i]);
	}
	return output;
}

// Make effects for an effect group
function make_effect_group(elem)
{
	var output = [];
	var effects = $(elem).find('[name="effect"]:visible');
	for(var i = 0; i < effects.length; i++)
	{
		output[i] = populate_object_values(EFFECT_FIELDS, effects[i]);
	}
	return output;
}

function populate_object_values(fields, parent)
{
	var output = {};
    $.each(fields, function(i, field) {
        // search for all visible controls with that field name.
        var fieldControls = {};
		
		if(parent && $(parent.firstChild)) {
			fieldControls = $(parent).find('[name="'+field+'"]:visible');
		}
		else {
			fieldControls = $('[name="'+field+'"]:visible');
		}
        
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
	return output;
}

// Disables the "add stat" button if it would be impossible for the next stat in an effect to be modified
function check_stat_button(elem)
{
	console.log("Checking stat button.");
	var statButton = $(elem).parent().parent().siblings(['name="effectbutton"']);
	if($(elem).val() == 100)
	{
		statButton.prop("disabled",true);
	}
	else
	{
		statButton.prop("disabled",false);
	}
}

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
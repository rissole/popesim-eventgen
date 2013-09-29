$(function() {

$('#eventForm').submit(function() {
    var output = {};
    var ename = $('input[name=ename]').val();
    output['ename'] = ename;
    $('#output textarea').val(JSON.stringify(output));
    $('#output').show();
    return false;
});

});
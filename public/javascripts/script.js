console.log($("#submit-handle").disabled);
$("#twitter-handle-form").submit(function (event) {
    let processedHandle;
    let rawFormInput = $("#twitter-handle").val();
    processedHandle = rawFormInput.toLowerCase();
    $.post("/submitHandle", {handle: processedHandle}, function(data) {
        console.log(data);
    })
    event.preventDefault();
});

$("#twitter-handle").keyup(function () {
    if ($(this).val().length >= 1 && $(this).val().charAt(0) != "@") {
        $("#submit-handle").removeAttr('disabled');
    }
    if($(this).val().length < 1) {
        $("#submit-handle").attr('disabled', 'disabled');
    }
})
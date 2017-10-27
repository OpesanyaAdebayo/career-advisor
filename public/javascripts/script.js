$("#twitterHandleForm").submit(function (event) {
    $("#submitHandle").attr('disabled', 'disabled');
    let processedHandle;
    let rawFormInput = $("#twitterHandle").val();
    processedHandle = rawFormInput.toLowerCase();
    $.post("/inputhandle", {
        handle: processedHandle
    }, function (data) {
        console.log(data);
    })
    event.preventDefault();
});

$("#twitterHandle").keyup(function () {
    if ($(this).val().length >= 1 && $(this).val().charAt(0) != "@") {
        $("#submitHandle").removeAttr('disabled');
    }
    if ($(this).val().length < 1) {
        $("#submitHandle").attr('disabled', 'disabled');
        $("#signup").attr('disabled', 'disabled');
    }
})

$("#signup").click(function () {
    $("#loginContainer").hide();
    $("#signupContainer").show();
})

$("#login").click(function () {
    $("#signupContainer").hide();
    $("#loginContainer").show();
})

$("#loginForm").submit(function (event) {
    $("#loginButton").attr('disabled', 'disabled');
    $("#signup").hide();
    $("small").hide();
    $.post("/auth/login", $("#loginForm").serialize(), function (data) {
        window.location.href = '/dashboard';
    })
    event.preventDefault();
})

$("#signupForm").submit(function (event) {
    $("#signupButton").attr('disabled', 'disabled');
    $("#login").hide();
    $("small").hide();
    $.post("/auth/signup", $("#signupForm").serialize(), function (data) {
        if (typeof (data) == "object") {
            window.location.href = '/inputhandle';
            return false;
        }
        else {
            alert(data);
        }
    })
    event.preventDefault();
})
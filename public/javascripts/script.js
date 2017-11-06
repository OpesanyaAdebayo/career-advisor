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

$("#twitterHandleForm").submit(function (event) {
    $("#submitHandle").attr('disabled', 'disabled');
    let rawFormInput = $("#twitterHandle").val();
    let processedHandle = rawFormInput.toLowerCase();
    $.post("/inputhandle", $("#twitterHandleForm").serialize(), function (data) {
        window.location.href = '/dashboard';
        return false;
    })
    event.preventDefault();
});


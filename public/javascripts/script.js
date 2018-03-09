$("#signup").click(function () {
    $("#loginContainer").hide();
    $("#signupContainer").show();
});

$("#login").click(function () {
    $("#signupContainer").hide();
    $("#loginContainer").show();
});

$("#loginForm").submit(function (event) {
    $("#loginButton").attr('disabled', 'disabled');
    $("#signup").hide();
    $("small").hide();
    $.post("/auth/login", $("#loginForm").serialize(), (data) => {
        if (data.message) {
            alert(data.message);
        } else {
            window.location.href = '/dashboard';
            return false;
        }
    }).fail(() => {
        alert("Please check your connectivity and refresh the page.");
    });
    event.preventDefault();
});

$("#signupForm").submit(function (event) {
    $("#signupButton").attr('disabled', 'disabled');
    $("#login").hide();
    $("small").hide();

    $.post("/auth/signup", $("#signupForm").serialize(), (data) => {
        if (data.message) {
            alert(data.message);
        } else {
            window.location.href = '/inputhandle';
            return false;
        }
    }).fail(() => {
        alert("Please check your connectivity and refresh the page.");
    });
    event.preventDefault();
});

$("#twitterHandleForm").submit(function (event) {
    $("#submitHandle").attr('disabled', 'disabled');
    let rawFormInput = $("#twitterHandle").val();
    let processedHandle = rawFormInput.toLowerCase();
    $.post("/inputhandle", $("#twitterHandleForm").serialize(), function (data) {
        window.location.href = '/dashboard';
        return false;
    });
    event.preventDefault();
});
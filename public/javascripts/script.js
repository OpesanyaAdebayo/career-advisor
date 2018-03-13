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
            $(".error").html(data.message);
            $(".alert").addClass("show");
            $("#loginButton").removeAttr('disabled');
            setTimeout(() => $(".alert").removeClass("show"), 4000);
            $("#signup").show();
            $("small").show();

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
            $(".error").html(data.message);
            $(".alert").addClass("show");
            $("#signupButton").removeAttr('disabled');
            setTimeout(() => $(".alert").removeClass("show"), 4000);
            $("#login").show();
            $("small").show();


        } else {
            window.location.href = '/inputhandle';
            return false;
        }
    }).fail(() => {
        $(".error").html("Please check your connectivity and refresh the page.");
        $(".alert").addClass("show");
        $("#signupButton").removeAttr('disabled');
        setTimeout(() => $(".alert").removeClass("show"), 4000);
        $("#login").show();
        $("small").show();
    });
    event.preventDefault();
});

$("#twitterHandleForm").submit(function (event) {
    $("#submitHandle").attr('disabled', 'disabled');
    let rawFormInput = $("#twitterHandle").val();
    let processedHandle = rawFormInput.toLowerCase();
    $.post("/inputhandle", $("#twitterHandleForm").serialize(), function (data) {
        if (data.message) {
            $(".error").html(data.message);
            $(".alert").addClass("show");
            $("#submitHandle").removeAttr('disabled');
            setTimeout(() => $(".alert").removeClass("show"), 4000);

        } else {
            window.location.href = '/dashboard';
            return false;
        }
    });
    event.preventDefault();
});

$("#careerDetails").on("click", ".btn-link", (event) => {
    let number = $(event.currentTarget).parent().next().attr("id");
    let clickedCareer = $(event.currentTarget).parent().next();

    clickedCareer.find(".content").hide();

    $.post("/getCareerDetails", {
        number: number
    }, function (data) {
        console.log(data);
        clickedCareer.find(".content").show();

        clickedCareer.find(".description").html(data.description);

        let titles = data.reportedJobTitles.map((title) => "<li class>" + title + "</li>");
        clickedCareer.find(".jobTitles").append(titles.join(''));

        if (!data.relatedOccupations) {
            clickedCareer.find(".occupation").hide();
        } else {
            let relatedOccupations = data.relatedOccupations.map((occupation) => `<li class = 'relatedOccupation'>${occupation.title}</li>`);
            clickedCareer.find(".relatedOccupations").append(relatedOccupations.join(''));
        }

        let tasks = data.tasks.map((task) => `<li class = 'task'>${task.name}</li>`);
        clickedCareer.find(".tasks").append(tasks.join(''));

        let knowledgeAreas = data.knowledge.map((area) => `<li class = 'area'>${area.name}</li>`);
        clickedCareer.find(".knowledgeAreas").append(knowledgeAreas.join(''));

        let skills = data.skills.map((skill) => `<li class = 'area'>${skill.name}</li>`);
        clickedCareer.find(".skills").append(skills.join(''));

        let workStyles = data.workStyles.map((style) => `<li class = 'workStyle'>${style.description.replace("Job","Career")}</li>`);
        clickedCareer.find(".workStyles").append(workStyles.join(''));
    });
});
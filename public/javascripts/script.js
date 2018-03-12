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
            $("#loginButton").removeAttr('disabled');
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
            alert(data.message);
            $("#signupButton").removeAttr('disabled');
            $("#login").show();
            $("small").show();

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

$("#careerDetails").on("click", ".btn-link", (event) => {
    let number = $(event.currentTarget).parent().next().attr("id");

    $.post("/getCareerDetails", {
        number: number
    }, function (data) {
        console.log(data);
        let clickedCareer = $(event.currentTarget).parent().next();

        clickedCareer.find(".description").html(data.description);

        let titles = data.reportedJobTitles.map((title) => "<li class>" + title + "</li>");
        clickedCareer.find(".jobTitles").append(titles.join(''));

        if (!data.relatedOccupations) {
            clickedCareer.find(".occupation").hide();
        } else {
            let relatedOccupations = data.relatedOccupations.map((occupation) => `<li class = 'relatedOccupation'><a href = '/getRelated/${occupation.code}'>${occupation.title}</a></li>`);
            clickedCareer.find(".relatedOccupations").append(relatedOccupations.join(''));
        }

        let tasks = data.tasks.map((task) => `<li class = 'task'>${task.name}</li>`);
        clickedCareer.find(".tasks").append(tasks.join(''));

        let knowledgeAreas = data.knowledge.map((area) => `<li class = 'area'>${area.name}</li>`);
        clickedCareer.find(".knowledgeAreas").append(knowledgeAreas.join(''));

        let skills = data.skills.map((skill) => `<li class = 'area'>${skill.name}</li>`);
        clickedCareer.find(".skills").append(skills.join(''));

        let workStyles = data.workStyles.map((style) => `<p class = 'workStyle'>${style.description}</p>`).map((style) => style.replace("Job","Career"));
        clickedCareer.find(".workStyles").append(workStyles.join(''));
    });
});
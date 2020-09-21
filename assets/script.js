$(document).ready(function () {

    var appID = "2a69499345df0d7995aa3cfc5923674c";

    $(".query-btn").on("click", function () {
        console.log("Search Button has been clicked");
        var citySearch = $("#city-search").val();
        console.log(citySearch);

        var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=" + appID;

        console.log(weather);

        $.ajax({
            url: weather,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response;

            $("#city").text(results.name);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png");
            $("#description").html(results.weather[0].description);
            $("#temperature").html(results.main.temp);
            $("#humidity").html(results.main.humidity);
            $("#wind-speed").html(results.wind.speed);
        });



        //    $.getJSON(weather, function (json) {
        //     $("#city").html(json.name);
        //     // $("#main_weather").html(json.weather[0].main);
        //     // $("#description_weather").html(json.weather[0].description);
        //     $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
        //     $("#temperature").html(json.main.temp);
        //     // $("#pressure").html(json.main.pressure);
        //     $("#humidity").html(json.main.humidity);
        //     $("#wind-speed").html(json.main.wind.speed);
        //     $("#uv").html(json.main.humidity);
        // });


    })


});
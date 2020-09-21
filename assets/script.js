$(document).ready(function () {

    var appID = "2a69499345df0d7995aa3cfc5923674c";

    $(".query-btn").on("click", function () {
        console.log("Search Button has been clicked");
        var citySearch = $("#city-search").val();
        console.log(citySearch);

        // Call for current weather using city name in main search 
        var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&APPID=" + appID;

        var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + appID;


        $.ajax({
            url: weather,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response;

            // Converting UNIX timestamp to current date with Moment JS
            var currentDate = moment.unix(results.dt).format("(MM/DD/YY)");
            console.log(currentDate);
    
            
            // Rendering weather data to HTML for TODAY
            $("#city").text(results.name);
            $("#todays-date").html(currentDate);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png");
            $("#description").html(results.weather[0].description);
            $("#temperature").html(Math.trunc(results.main.temp) +"°F");
            $("#humidity").html(results.main.humidity + "%");
            $("#wind-speed").html(results.wind.speed + " MPH");
        });

        $.ajax({
            url: fiveDay,
            method: "GET"
        }).then(function (summary) {
            console.log(summary);

            var forecast = summary.list;
            console.log(forecast);


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
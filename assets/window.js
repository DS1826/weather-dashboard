$(window).on("load", function () {

    var appID = "2a69499345df0d7995aa3cfc5923674c";

    var citiesSearched = JSON.parse(localStorage.getItem("city"));
    citySearch = citiesSearched.pop();

        // Call for current weather using city name in main search 
        var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&APPID=" + appID;

        var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + appID;

        // Ajax query for current weather at city searched
        $.ajax({
            url: weather,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response;
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // Converting UNIX timestamp to current date with Moment.js
            var currentDate = moment.unix(results.dt).format("(MM/DD/YY)");
            console.log(currentDate);

            // Rendering weather data to HTML for TODAY
            $("#city").text(results.name);
            $("#todays-date").html(currentDate);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png");
            $("#description").html(results.weather[0].description);
            $("#temperature").html(Math.trunc(results.main.temp) + "°F");
            $("#humidity").html(results.main.humidity + "%");
            $("#wind-speed").html(results.wind.speed + " MPH");

            // Call and nested Ajax query for UV Index
            var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + appID;

            // Ajax query for current UV Index at city searched
            $.ajax({
                url: uvIndex,
                method: "GET"
            }).then(function (uvdata) {
                console.log(uvdata);

                var uvIndex = (uvdata.value);

                // Render UV Index to HTML
                $("#uv-index").html(uvIndex);

                if (uvIndex >= 0 && uvIndex < 3) {
                    $("#uv-index").addClass("low-uv");
                }
                if (uvIndex >= 3 && uvIndex < 6) {
                    $("#uv-index").addClass("mod-uv");
                }
                if (uvIndex >= 6 && uvIndex < 8) {
                    $("#uv-index").addClass("high-uv");
                }
                if (uvIndex >= 8 && uvIndex < 11) {
                    $("#uv-index").addClass("very-high-uv");
                }
                if (uvIndex >= 11) {
                    $("#uv-index").addClass("extreme-uv");
                }

            });

    
        });
        // Ajax query for 5 day forecast for city searched
        $.ajax({
            url: fiveDay,
            method: "GET"
        }).then(function (summary) {

            var forecast = summary.list;
            console.log(forecast);

            $("#five-day").empty();

            // For loop displays 5 day forecast data in HTML 
            for (var i = 3; i < forecast.length; i += 8) {
                var fiveDayDiv = $("<div>").attr("class", "col").attr("id", "five-day-div");
                var h = $("<h4>").text(moment(forecast[i].dt_txt).format("MM/DD"));
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecast[i].weather[0].icon + ".png");
                var tempMin = $("<h5>").text("Low: " + Math.trunc(forecast[i].main.temp_min) + "°F");
                var tempMax = $("<h5>").text("High: " + Math.trunc(forecast[i].main.temp_max) + "°F");

                console.log(h);

                fiveDayDiv.append(h)
                fiveDayDiv.append(img);
                fiveDayDiv.append(tempMax);
                fiveDayDiv.append(tempMin);
                $("#five-day").append(fiveDayDiv);
            }

        });



});
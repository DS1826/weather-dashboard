$(document).ready(function () {

    var appID = "2a69499345df0d7995aa3cfc5923674c";

    $(".query-btn").on("click", function () {

        var buttonVal = $(this).attr("data-id");

        // If else will return citySearch value based on which search button was clicked
        if (buttonVal === 0) {
            console.log("Button ID Value is " + buttonVal);
            console.log("Search Button has been clicked");
            var citySearch = $("#city-search").val();
            console.log(citySearch);
        } else {
            var citySearch = $(this).text();
            console.log(citySearch);
        }

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
        

            var forecast = summary.list;
            console.log(forecast);
        
            // For loop to display forecast data in HTML 
            for (var i = 0; i < forecast.length; i+=8) {
                var fiveDayDiv = $("<div>").attr("class", "col");
                var h = $("<h5>").text(moment(forecast[i].dt_txt).format("MM/DD"));
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecast[i].weather[0].icon + ".png");
                var tempMin = $("<p>").text("Low: " + Math.trunc(forecast[i].main.temp_min) + "°F");
                var tempMax = $("<p>").text("High: " + Math.trunc(forecast[i].main.temp_max) + "°F");
                
                console.log(h);

                fiveDayDiv.append(h)
                fiveDayDiv.append(img);
                fiveDayDiv.append(tempMax);
                fiveDayDiv.append(tempMin);
                $("#five-day").append(fiveDayDiv);
            }


        });

    })

});
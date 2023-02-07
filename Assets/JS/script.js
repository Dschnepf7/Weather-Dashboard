var apiKey = "1f45372791d6a8f4d5d597d252e267c5"

var searchButton = document.querySelector("#searchButton");
var textInput = document.querySelector("#searchBar");

var baseURL = "https://api.openweathermap.org/"


var cities = JSON.parse(localStorage.getItem("cities")) || [];

searchButton.addEventListener('click', function(){

    var userCity = textInput.value;

        cities.push(userCity);

        localStorage.setItem("cities", (JSON.stringify(cities)));

    var bigBoxURL = baseURL + "data/2.5/weather?q=" + userCity + "&appid=" + apiKey + "&units=imperial";

    fetch(bigBoxURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(dataOneDay){
        console.log(dataOneDay);

        var windSpeedOneDay=(dataOneDay.wind.speed);
        var tempOneDay=(dataOneDay.main.temp);
        var humidityOneDay=(dataOneDay.main.humidity);

        document.getElementById("currentCity").textContent=(userCity);
        document.getElementById("currentTemp").textContent=("Temp: " +tempOneDay+" F");
        document.getElementById("currentWind").textContent=("Wind: "+ windSpeedOneDay+ " mph");
        document.getElementById("currentHumidity").textContent=("Humidity: "+humidityOneDay+ "%");


    //     let iconOneDay = "http://openweathermap.org/img/w/" + dataOneDay.weather[0].icon + ".png";
    //     document.getElementById("currentIcon").setAttribute("src", iconOneDay);

    //     let icon=document.createElement("img");
    //   icon.setAttribute("src", iconOneDay);
    //   icon.setAttribute("id", "currentIcon");

        var forecastURL = baseURL + "data/2.5/forecast?q=" + userCity + "&appid=" + apiKey + "&units=imperial";

        fetch(forecastURL)
        .then(function(response){
            return response.json();
        })
        .then(function(dataForecast){
            console.log(dataForecast);

            var tomorrowsTemp = dataForecast.list[0].main.temp;
            var twoDaysTemp = dataForecast.list[8].main.temp;
            var threeDaysTemp = dataForecast.list[16].main.temp;
            var fourDaysTemp = dataForecast.list[24].main.temp;
            var fiveDaysTemp = dataForecast.list[32].main.temp;

            document.getElementById("tomorrowTemp").textContent=("Temp: " +tomorrowsTemp+" F");
            document.getElementById("twoDaysTemp").textContent=("Temp: " +twoDaysTemp+" F");
            document.getElementById("threeDaysTemp").textContent=("Temp: " +threeDaysTemp+" F");
            document.getElementById("fourDaysTemp").textContent=("Temp: " +fourDaysTemp+" F");
            document.getElementById("fiveDaysTemp").textContent=("Temp: " +fiveDaysTemp+" F");
        })
    })
})




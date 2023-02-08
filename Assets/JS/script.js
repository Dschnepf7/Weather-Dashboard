var apiKey = "1f45372791d6a8f4d5d597d252e267c5"

var searchButton = document.querySelector("#searchButton");
var textInput = document.querySelector("#searchBar");
var searchDiv = document.getElementById("searchHistory");
var cityBtn = document.querySelector(".cityBtn");
var baseURL = "https://api.openweathermap.org/"


var cities = JSON.parse(localStorage.getItem("cities")) || [];

function searchHistory() {
    for (let i = 0; i < 5; i++) {
        var historyBtn = document.createElement("button");
        historyBtn.textContent = cities[i]
        historyBtn.classList.add("cityBtn");
        searchDiv.appendChild(historyBtn);
        historyBtn.style.display = "block";

        

    }
}
searchHistory();

// window.onload = cityBtn.addEventListener('click', function(){
//     console.log("test");

// })


searchButton.addEventListener('click', function () {

    var userCity = textInput.value;

    cities.push(userCity);

    localStorage.setItem("cities", (JSON.stringify(cities)));

    var bigBoxURL = baseURL + "data/2.5/weather?q=" + userCity + "&appid=" + apiKey + "&units=imperial";

    fetch(bigBoxURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataOneDay) {
            console.log(dataOneDay);

            var windSpeedOneDay = (dataOneDay.wind.speed);
            var tempOneDay = (dataOneDay.main.temp);
            var humidityOneDay = (dataOneDay.main.humidity);

            document.getElementById("currentCity").textContent = (userCity);
            document.getElementById("currentTemp").textContent = ("Temp: " + tempOneDay + " F");
            document.getElementById("currentWind").textContent = ("Wind: " + windSpeedOneDay + " mph");
            document.getElementById("currentHumidity").textContent = ("Humidity: " + humidityOneDay + "%");


            //     let iconOneDay = "http://openweathermap.org/img/w/" + dataOneDay.weather[0].icon + ".png";
            //     document.getElementById("currentIcon").setAttribute("src", iconOneDay);

            //     let icon=document.createElement("img");
            //   icon.setAttribute("src", iconOneDay);
            //   icon.setAttribute("id", "currentIcon");

            var forecastURL = baseURL + "data/2.5/forecast?q=" + userCity + "&appid=" + apiKey + "&units=imperial";

            fetch(forecastURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (dataForecast) {
                    console.log(dataForecast);

                    var tomorrowsTemp = dataForecast.list[0].main.temp;
                    var twoDaysTemp = dataForecast.list[8].main.temp;
                    var threeDaysTemp = dataForecast.list[16].main.temp;
                    var fourDaysTemp = dataForecast.list[24].main.temp;
                    var fiveDaysTemp = dataForecast.list[32].main.temp;

                    document.getElementById("tomorrowTemp").textContent = ("Temp: " + tomorrowsTemp + " F");
                    document.getElementById("twoDaysTemp").textContent = ("Temp: " + twoDaysTemp + " F");
                    document.getElementById("threeDaysTemp").textContent = ("Temp: " + threeDaysTemp + " F");
                    document.getElementById("fourDaysTemp").textContent = ("Temp: " + fourDaysTemp + " F");
                    document.getElementById("fiveDaysTemp").textContent = ("Temp: " + fiveDaysTemp + " F");

                    var tomorrowsWind = dataForecast.list[0].wind.speed;
                    var twoDaysWind = dataForecast.list[8].wind.speed;
                    var threeDaysWind = dataForecast.list[16].wind.speed;
                    var fourDaysWind = dataForecast.list[24].wind.speed;
                    var fiveDaysWind = dataForecast.list[32].wind.speed;

                    document.getElementById("tomorrowWind").textContent = ("Wind: " + tomorrowsWind + " mph");
                    document.getElementById("twoDaysWind").textContent = ("Wind: " + twoDaysWind + " mph");
                    document.getElementById("threeDaysWind").textContent = ("Wind: " + threeDaysWind + " mph");
                    document.getElementById("fourDaysWind").textContent = ("Wind: " + fourDaysWind + " mph");
                    document.getElementById("fiveDaysWind").textContent = ("Wind: " + fiveDaysWind + " mph");

                    var tomorrowsHumidity = dataForecast.list[0].main.humidity;
                    var twoDaysHumidity = dataForecast.list[8].main.humidity;
                    var threeDaysHumidity = dataForecast.list[16].main.humidity;
                    var fourDaysHumidity = dataForecast.list[24].main.humidity;
                    var fiveDaysHumidity = dataForecast.list[32].main.humidity;

                    document.getElementById("tomorrowHumid").textContent = ("Humidity: " + tomorrowsHumidity + "%");
                    document.getElementById("twoDaysHumid").textContent = ("Humidity: " + twoDaysHumidity + "%");
                    document.getElementById("threeDaysHumid").textContent = ("Humidity: " + threeDaysHumidity + "%");
                    document.getElementById("fourDaysHumid").textContent = ("Humidity: " + fourDaysHumidity + "%");
                    document.getElementById("fiveDaysHumid").textContent = ("Humidity: " + fiveDaysHumidity + "%");

                    let days = [];
                    let daysRequired = 5

                    for (let i = 1; i <= daysRequired; i++) {
                        days.push(moment().add(i, 'days').format('ddd, Do MMMM'))
                    }

                    // console.log(days)
                    // console.log(days[0]);
                    document.getElementById("tomorrowDate").textContent = days[0];
                    document.getElementById("twoDaysDate").textContent = days[1];
                    document.getElementById("threeDaysDate").textContent = days[2];
                    document.getElementById("fourDaysDate").textContent = days[3];
                    document.getElementById("fiveDaysDate").textContent = days[4];

                    let iconOneDay = "" + "https://openweathermap.org/img/w/" + dataOneDay.weather[0].icon + ".png";
                    let icon = document.createElement("img");
                    icon.setAttribute("src", iconOneDay);
                    icon.setAttribute("id", "icon-one-day");
                    document.getElementById("currentCity").appendChild(icon);
                })
        })
})




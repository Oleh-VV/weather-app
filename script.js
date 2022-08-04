// variables DOM elements
let city = document.querySelector(".main-city");
let form = document.querySelector("#formsearch");
let currentbtn = document.querySelector(".currentbtn");
let icon_weather = document.querySelector("#icon-weather");
let unitCels = document.querySelector(".celsius");
let unitFahr = document.querySelector(".fahrenheit");
let temperature = document.querySelector(".temperature");
let sky = document.querySelector(".sky");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let cities = document.body.querySelector(".city-btn-block").children;
let days_5 = document.querySelector(".days-5");
let days_7 = document.querySelector(".days-7");

// other variables
let lat;
let lon;
let url;
let cityname = "Kyiv";
let tempCels;
let tempFahr;
let unitFlag = 1;
let days_index = 5;

// variables API
let apiKey = "ae0d6c1e0f247031b20f4e5e8d4b4dc6";
let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;

// first show weather
getWeatherInfo();

// function to get and show weather info
function getWeatherInfo() {
  axios.get(urlCity).then((response) => {
    icon_weather.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon_weather.setAttribute("alt", "response.data.weather[0].description");
    sky.innerHTML = response.data.weather[0].main;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
    temperature.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    function displayForecast(response) {
      let forecast = response.data.daily;
      let forecastElement = document.querySelector(".forecast-weather");
      let forecastHTML = ``;
      forecast.forEach(function (forecastDay, index) {
        if (index < days_index) {
          forecastHTML =
            forecastHTML +
            `<div class="week">
  <div class="day">${formatDate(forecastDay.dt)}</div>
          <img
            id="icon-weather"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="icon-weather"
          />
          <div class="temp-forecast">
            <span class="temp-max"> ${Math.round(
              forecastDay.temp.max
            )}&#176; </span>
            <span class="temp-min"> ${Math.round(
              forecastDay.temp.min
            )}&#176; </span>
          </div></div>`;
        }
      });
      forecastElement.innerHTML = forecastHTML;
    }
    function formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let day = date.getDay();
      let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return days[day];
    }
  });
}

// function to find city from searchfield
function findCity(event) {
  event.preventDefault();
  cityname = document.querySelector(".searchfield").value;
  cityname = cityname[0].toUpperCase() + cityname.slice(1).toLowerCase();
}

//function  get an show weather in current place
function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(getCoords);
  getWeatherInfo();
}
function getCoords(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then((response) => {
    temperature.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    getForecast(response.data.coord);
  });
}

//function get and show weather by buttons
function showBtnCitiyTemp(cityName) {
  cityname = cityName.innerHTML;
  urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(urlCity).then((response) => {
    temperature.innerHTML = Math.round(response.data.main.temp);
    getWeatherInfo(response);
  });
  city.innerHTML = cityname;
}

//  function show current date
function showDate() {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  let curdate = `${
    week[date.getDay()]
  } ${date.getHours()}:${minutes}:${seconds}`;
  document.querySelector(".currentdate").innerHTML = curdate;
}
setInterval(showDate, 1000);

//adding btn events
form.addEventListener("submit", () => {
  findCity;
  getWeatherInfo();
});
currentbtn.addEventListener("click", showCurrentTemp);
unitFahr.addEventListener("click", () => {
  if (unitFlag === 1) {
    tempCels = temperature.innerHTML;
    tempFahr = Math.round((tempCels * 9) / 5 + 32);
    temperature.innerHTML = tempFahr;
    unitFlag = 2;
  }
});
unitCels.addEventListener("click", () => {
  unitFlag = 1;
  tempCels = Math.round(((tempFahr - 32) * 5) / 9);
  temperature.innerHTML = tempCels;
});
days_5.addEventListener("click", () => {
  days_index = 5;
  getWeatherInfo();
});
days_7.addEventListener("click", () => {
  days_index = 7;
  getWeatherInfo();
});

cities[0].addEventListener("click", () => showBtnCitiyTemp(cities[0]));
cities[1].addEventListener("click", () => showBtnCitiyTemp(cities[1]));
cities[2].addEventListener("click", () => showBtnCitiyTemp(cities[2]));
cities[3].addEventListener("click", () => showBtnCitiyTemp(cities[3]));
cities[4].addEventListener("click", () => showBtnCitiyTemp(cities[4]));
cities[5].addEventListener("click", () => showBtnCitiyTemp(cities[5]));

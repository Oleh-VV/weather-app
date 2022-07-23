function getWeatherInfo(response) {
  icon_weather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon_weather.setAttribute("alt", "response.data.weather[0].description");
  let sky = document.querySelector(".sky");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let s;
  sky.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
}
function showCity(event) {
  event.preventDefault();
  cityname = document.querySelector("#searchfield").value;
  cityname = cityname[0].toUpperCase() + cityname.slice(1).toLowerCase();
  urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(urlCity).then((response) => {
    temperature.innerHTML = Math.round(response.data.main.temp);
    getWeatherInfo(response);
  });
  city.innerHTML = cityname;
}
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
  document.querySelector("#currentdate").innerHTML = curdate;
}
let city = document.querySelector("#showdisp .spancity");
let form = document.querySelector("#formsearch");
form.addEventListener("submit", showCity);

let currentbtn = document.querySelector("#currentbtn");
currentbtn.addEventListener("click", showCurrentTemp);
setInterval(showDate, 1000);
let icon_weather = document.querySelector("#icon-weather");
let unitCels = document.querySelector("#celsius");
let unitFahr = document.querySelector("#fahrenheit");
let temperature = document.querySelector("#temperature");
let tempCels = 15;
let lat;
let lon;
let url;
let cityname;
let apiKey = "ae0d6c1e0f247031b20f4e5e8d4b4dc6";
temperature.innerHTML = tempCels;
let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
axios.get(urlCity).then((response) => {
  console.log(response.data.weather[0].icon);
  temperature.innerHTML = Math.round(response.data.main.temp);
  getWeatherInfo(response);
});
city.innerHTML = "Kyiv";

let tempFahr = Math.round((tempCels * 9) / 5 + 32);
unitFahr.addEventListener("click", () => (temperature.innerHTML = tempFahr));
unitCels.addEventListener("click", () => (temperature.innerHTML = tempCels));

function getCoords(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then((response) => {
    temperature.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    getWeatherInfo(response);
  });
}
function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(getCoords);
}
let cities = document.body.querySelector(".col-3").children;
cities[0].addEventListener("click", () => showBtnCitiyTemp(cities[0]));
cities[1].addEventListener("click", () => showBtnCitiyTemp(cities[1]));
cities[2].addEventListener("click", () => showBtnCitiyTemp(cities[2]));
cities[3].addEventListener("click", () => showBtnCitiyTemp(cities[3]));
cities[4].addEventListener("click", () => showBtnCitiyTemp(cities[4]));
function showBtnCitiyTemp(cityName) {
  cityname = cityName.innerHTML;
  urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(urlCity).then((response) => {
    temperature.innerHTML = Math.round(response.data.main.temp);
    getWeatherInfo(response);
  });
  city.innerHTML = cityname;
}

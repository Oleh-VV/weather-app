function showCity(event) {
  event.preventDefault();
  cityname = document.querySelector("#searchfield").value;

  cityname = cityname[0].toUpperCase() + cityname.slice(1).toLowerCase();
  urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios
    .get(urlCity)
    .then(
      (response) =>
        (temperature.innerHTML = Math.round(response.data.main.temp))
    );
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
axios
  .get(urlCity)
  .then(
    (response) => (temperature.innerHTML = Math.round(response.data.main.temp))
  );
city.innerHTML = "Kyiv";

let tempFahr = Math.round((tempCels * 9) / 5 + 32);
unitFahr.addEventListener("click", () => (temperature.innerHTML = tempFahr));
unitCels.addEventListener("click", () => (temperature.innerHTML = tempCels));

function getCoords(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios
    .get(url)
    .then(
      (response) => (
        (temperature.innerHTML = Math.round(response.data.main.temp)),
        (city.innerHTML = response.data.name)
      )
    );
}
function showCurrentTemp() {
  navigator.geolocation.getCurrentPosition(getCoords);
}

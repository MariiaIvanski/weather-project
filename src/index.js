let now = new Date();
let dateTime = document.querySelector("#date-time");

function formatDate(date) {
  date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  dateTime.innerHTML = `${day}, ${hours}:${minutes}`;
}
formatDate(now);

let tempShow;
importLocationWeather();

const currentDescription = document.querySelector(`#description`);
const currentHumidity = document.querySelector(`#humidity`);
const currentWind = document.querySelector(`#wind`);
const outputCity = document.querySelector(`#output-city`);
const currentDegrees = document.querySelector(`#current-degrees`);
const apiKey = `a2d283df905dedf8786b96ad24673f92`;

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector(`#input-city`).value;
  outputCity.innerHTML = `${inputCity}`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

let cityForm = document.querySelector(`#please-enter-city`);
cityForm.addEventListener("submit", showCity);

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  tempShow = temperature;
  currentDegrees.innerHTML = `${temperature}`;
  currentDescription.innerHTML = `${response.data.weather[0].main}`;
  currentHumidity.innerHTML = `${response.data.main.humidity}`;
  let wind = response.data.wind.speed;
  currentWind.innerHTML = Math.round(wind * 3.6);
}

function importLocationWeather() {
  document.querySelector(`#input-city`).value = ``;

  function showWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    tempShow = temperature;
    currentDegrees.innerHTML = `${temperature}`;
    outputCity.innerHTML = response.data.name;
    currentDescription.innerHTML = `${response.data.weather[0].main}`;
    currentHumidity.innerHTML = `${response.data.main.humidity}`;
    let wind = response.data.wind.speed;
    currentWind.innerHTML = Math.round(wind * 3.6);
  }

  function retrievePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentPosition = document.querySelector(`#current-city`);
currentPosition.addEventListener("click", importLocationWeather);

function celsToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-degrees");
  temp.innerHTML = `${Math.round((tempShow * 9) / 5 + 32)}`;
}

function fahrToCels(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-degrees");
  temp.innerHTML = `${tempShow}`;
}
let celsiusDegrees = document.querySelector("#celsius");
celsiusDegrees.addEventListener("click", fahrToCels);

let fahrenheitDegrees = document.querySelector("#fahrenheit");
fahrenheitDegrees.addEventListener("click", celsToFahrenheit);

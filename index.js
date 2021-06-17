function formatDate(date) {
  let currentTime = new Date(date);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentTime.getMonth()];
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dates = currentTime.getDate();
  if (dates < 10) {
    dates = `0${dates}`;
  }
  let day = days[currentTime.getDay()];
  return `${day}, ${month} ${dates} <br> ${hours}:${minutes}`;
}
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#City");
  let cityInput = document.querySelector("#searchInput");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}
function searchCity(city) {
  let apiKey = "a32a92574243f77d3ebcc51cf8a19a88";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherParameter);
  console.log(apiUrl);
}
searchCity("Paris");
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let formL = document.querySelector("form");
formL.addEventListener("submit", search);

function displayWeatherParameter(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#country`).innerHTML = response.data.sys.country;
  document.querySelector(`#temp`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputLocation").value;
  searchCity(city);
}
function currentPosition(position) {
  let apiKey = "a32a92574243f77d3ebcc51cf8a19a88";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherParameter);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let searchLocation = document.querySelector(".search-form");
searchLocation.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".btn-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusLink = document.querySelector("celsius-link");
celsiusLink.addEventListner("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("fahrenheit-link");
fahrenheitLink.addEventListner("click", displayFahrenheitTemperature);

let celsiusTemperature = null;

search("Paris");

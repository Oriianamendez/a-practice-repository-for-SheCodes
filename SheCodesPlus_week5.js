let today = new Date();
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let hour = today.getHours();
  //let minute = today.getMinutes();
  let minutes = String(today.getMinutes()).padStart(2, "0");
  let currentDate = `${day} ${hour}:${minutes}`;
  return currentDate;
}
let currentDateToday = document.querySelector("#today");
currentDateToday.innerHTML = formatDate();
//
let apiKey = "17ad6e67aa629189f73b053634668b20";

function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#enter-a-city");

  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(cityTemperature);
}

function cityTemperature(response) {
  console.log(response);
  let celsiusGrade = document.querySelector("#grade");
  let roundTemperature = Math.round(response.data.main.temp);
  celsiusGrade.innerHTML = roundTemperature;

  let feelsLike = document.querySelector("#sensation");
  let roundSensation = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like ${roundSensation}°C`;

  let humidityPercentage = document.querySelector("#humidity");
  humidityPercentage.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}km/h`;

  let currentCity = document.querySelector("#caracas");
  currentCity.innerHTML = response.data.name;
}

function actualPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let latitudeLongitudePositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(latitudeLongitudePositionUrl).then(cityTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(actualPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#city-form");
form.addEventListener("submit", changeCity);

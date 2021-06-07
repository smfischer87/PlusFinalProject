let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();


let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = (`${hours}:${minutes}`);

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = (`${day} ${month} ${date}, ${year}`);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let daily = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHTML = `<div class="row">`;
  daily.forEach(function (day) {
   forecastHTML = forecastHTML +
   `<div class="col-2">
        <div class="single-forecast">
          <div class="day">
            ${day}
          </div>
          <img
            src="https://openweathermap.org/img/wn/01d@2x.png"
            alt="Clear"
            />
            <strong>89°</strong>  
            <span class="min">63°</span>
        </div>
      </div>
    `;
})
  forecastHTML = forecastHTML + `</div>`;  
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
    console.log(response);
  fahreinheitTemp = response.data.main.temp;
  let temperature = Math.round(fahreinheitTemp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°F`;
  let humidity = (response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `Wind Speed: ${windSpeed} mph`;
  let description = (response.data.weather[0].description);
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
  

function showCity(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#city-input");
  let heading = document.querySelector("h1");
  heading.innerHTML = (searchResult.value);
  let cityResult = (searchResult.value);
  let units = "imperial";
  let apiKey = "7df5a5dba03362a0ac69b144c09e5d71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}


let city = document.querySelector("form");
city.addEventListener("submit", showCity);

displayForecast();
const todayInfo = document.querySelector(".today-info");
const nextDaysInfo = document.querySelector(".next-days-info");

const submitBtn = document.querySelector("#submit");
const API_KEY = "36f192246259c7eee2dfaab9290c7407";

const errorMess = document.querySelector("span.error");
errorMess.classList.add("hidden");
async function getTodayInfo(lon, lat, API_KEY) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      displayWeatherDataToday(data);
    });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getTodayInfo(lon, lat, API_KEY);
    },
    (error) => {
      errorMess.classList.remove("hidden");
      errorMess.textContent =
        "Cannot access your location. Please enable location services.";
    }
  );
} else {
  errorMess.classList.remove("hidden");
  errorMess.textContent = "Your browser doesn't support geolocation.";
}

function displayWeatherDataToday(data) {
  errorMess.classList.add("hidden");
  const temp = Math.round((data.main.temp - 273.15) * 10) / 10;
  todayInfo.innerHTML = `
  <span class="date">${getDate()}</span>
  <span class="city">${data.name}</span>
  <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${
    data.weather[0].description
  }" class = "weather-icon"/>
  <span class="temp">${temp}°C</span>
  <span class="feel-like">Feels like: ${
    Math.round((data.main.feels_like - 273.15) * 10) / 10
  }°C</span>
  <span class="description">${data.weather[0].description}</span>
  `;
}
function getDate() {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function displayWeatherDataNextDays(data) {
  errorMess.classList.add("hidden");
  // Get the forecast for the next 4 days at 12:00:00
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 4);

  dailyForecasts.forEach((item, idx) => {
    const card = document.getElementById(`forecast-card-${idx}`);
    if (card) {
      // Update image
      const img = card.querySelector("img.illustrate");
      img.src = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
      img.alt = item.weather[0].description;

      // Update value (temperature)
      card.querySelector("span.value").textContent = `${Math.round((item.main.temp - 273.15) * 10) / 10}°C`;

      // Update amplitude (weather description)
      card.querySelector("span.amplitude").textContent = item.weather[0].main;

      // Update date
      card.querySelector("span.date").textContent = item.dt_txt.split(" ")[0];
    }
  });
}

submitBtn.addEventListener("click", () => {
  let city_input = document.querySelector("input[type='text']").value;
  getWeatherNextDays(city_input, API_KEY);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let city_input = document.querySelector("input[type='text']").value;
    getWeatherNextDays(city_input, API_KEY);
  }
});

function displayWeatherDataNextDays(data) {
  errorMess.classList.add("hidden");
  nextDaysInfo.innerHTML = `
    <h1>Next 5 days in ${data.city.name}</h1>
  `;
  data.list.forEach((item) => {
    if (item.dt_txt.split(" ")[1] == `12:00:00`) {
      nextDaysInfo.innerHTML += `
    <div class="day">
      <span class="date">${item.dt_txt}</span>
      <img src="http://openweathermap.org/img/w/${
        item.weather[0].icon
      }.png" alt="${item.weather[0].description}" class = "weather-icon"/>
      <span class="temp">${
        Math.round((item.main.temp - 273.15) * 10) / 10
      }°C</span>
      <span class="description">${item.weather[0].description}</span>
    </div>
    `;
    }
  });
}
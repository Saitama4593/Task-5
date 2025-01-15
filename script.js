const apiKey = "bee7eb44dc2553a35e4842fc6ad6e28c"; // Replace with your OpenWeatherMap API key
const weatherCard = document.getElementById("weather-card");
const errorText = document.getElementById("error");

function showError(message) {
  errorText.textContent = message;
  errorText.classList.remove("hidden");
  setTimeout(() => errorText.classList.add("hidden"), 5000);
}

function updateWeatherCard(data) {
  const { name, main, weather, wind } = data;

  document.getElementById("location").textContent = name;
  document.getElementById("temperature").textContent = `Temperature: ${main.temp}°C`;
  document.getElementById("description").textContent = `Condition: ${weather[0].description}`;
  document.getElementById("humidity").textContent = `Humidity: ${main.humidity}%`;
  document.getElementById("wind").textContent = `Wind: ${wind.speed} m/s`;

  weatherCard.classList.remove("hidden");
}

async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found.");
    const data = await response.json();
    updateWeatherCard(data);
  } catch (error) {
    showError(error.message);
  }
}

function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function useMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    }, () => showError("Unable to fetch location."));
  } else {
    showError("Geolocation not supported by your browser.");
  }
}

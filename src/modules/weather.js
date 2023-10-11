const API_KEY = "219a015ee939448aa0f195825231010";

export async function fetchWeather() {
  const location = document.getElementById("location").value;
  const url = `https://api.weatherapi.com/v1/current.json?key=219a015ee939448aa0f195825231010&q=${location}`;
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    document.getElementById("weather-display").innerText = `${data.location.name}: ${data.current.temp_c}°C`;
  } else {
    document.getElementById("weather-display").innerText = "Error fetching weather data!";
  }
}

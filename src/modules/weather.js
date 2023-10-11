const API_KEY = "219a015ee939448aa0f195825231010";

export async function fetchWeather() {
  const location = document.getElementById("location").value || 'Toronto';
  const url = `https://api.weatherapi.com/v1/current.json?key=219a015ee939448aa0f195825231010&q=${location}`;
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    document.getElementById("weather-display").innerText = `${data.location.name}: ${data.current.temp_c}°C`;

    // Display additional weather information
    document.getElementById("feels-like").innerText = `Feels Like: ${data.current.feelslike_c}°C`;
    document.getElementById("humidity").innerText = `Humidity: ${data.current.humidity}%`;

    // Convert chance of rain from mm to percentage
    const mmOfRain = parseFloat(data.current.precip_mm);
    const chanceOfRainPercentage = (mmOfRain / 25) * 100; // Assuming 25mm = 100% chance of rain
    document.getElementById("chance-of-rain").innerText = `Chance of Rain: ${chanceOfRainPercentage.toFixed(2)}%`;

    document.getElementById("wind-speed").innerText = `Wind Speed: ${data.current.wind_kph} km/h`;

    // Update the weather condition icon and text
    const conditionText = data.current.condition.text;
    const conditionIcon = data.current.condition.icon;

    // Assuming you have an img element with id "condition-icon"
    document.getElementById("condition-icon").src = `https:${conditionIcon}`;
    document.getElementById("condition-text").innerText = conditionText;
  } else {
    document.getElementById("weather-display").innerText = "Error fetching weather data!";
  }
}

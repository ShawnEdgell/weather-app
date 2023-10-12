import './style.css';

const API_KEY = '219a015ee939448aa0f195825231010';

async function fetchWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
    const data = await response.json();

    if (response.status !== 200) {
        throw new Error(data.error.message);
    }

    return data;
}

function processWeatherData(data) {
    const locationParts = data.location.name.split(',');
    const city = locationParts[0].trim();

    const isRaining = data.current.condition.code === 1063; // Check for rain condition code
    const isSnowing = data.current.condition.code === 1000; // Check for snow condition code

    return {
        location: city,
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        description: data.current.condition.text,
        icon: data.current.condition.icon,
        localDate: formatDate(data.location.localtime.split(' ')[0]),
        localTime: formatTime(data.location.localtime.split(' ')[1]),
        chanceOfRain: isRaining ? `${data.current.precip_mm}%` : '0%',
        chanceOfSnow: isSnowing ? `${data.current.precip_mm}%` : '0%',
    };
}

document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value || 'Toronto';
    fetchAndDisplayWeather(location);
});

async function fetchAndDisplayWeather(location) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none';

    // Use 'Toronto' as the default location if none is provided
    if (!location) {
        location = 'Toronto';
    }

    document.getElementById('loading').style.display = 'block';

    try {
        const weatherData = await fetchWeather(location);
        const processedData = processWeatherData(weatherData);
        displayWeatherInfo(processedData);
    } catch (error) {
        errorMessageDiv.textContent = "Failed to fetch weather. Please check the location and try again.";
        errorMessageDiv.style.display = 'block';
        console.error("Error:", error.message);
    }

    document.getElementById('loading').style.display = 'none';
}

function displayWeatherInfo(data) {
    document.getElementById('localDate').textContent = data.localDate;
    document.getElementById('localTime').textContent = data.localTime;
    document.getElementById('location').textContent = data.location;
    document.getElementById('description').textContent = data.description;
    document.getElementById('weatherIcon').src = data.icon;
    document.getElementById('temperature').textContent = `${data.temperature}°C`;
    document.getElementById('feelsLike').textContent = `${data.feelsLike}°C`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} kph`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} kph`;
    document.getElementById('chance-of-rain').textContent = `${data.chanceOfRain}`;
    document.getElementById('chance-of-snow').textContent = `${data.chanceOfSnow}`;
}

function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatTime(timeString) {
    let [hour, minutes] = timeString.split(':').map(str => parseInt(str, 10));

    const ampm = hour >= 12 ? 'pm' : 'am';
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

// Initialize the app with Toronto's weather
window.addEventListener('load', () => {
    fetchAndDisplayWeather();
});

// Add an event listener to the input field
document.getElementById('location-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // Prevent the default form submission behavior
      event.preventDefault();
      // If Enter key is pressed, trigger the button click
      document.getElementById('fetch-weather-btn').click();
    }
});

window.addEventListener('load', () => {
    fetchAndDisplayWeather();
});

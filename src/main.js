import './style.css';
import { fetchWeather } from './modules/weather.js';
import { setCurrentDate, setCurrentTime } from './modules/datetime.js';

window.fetchWeather = fetchWeather;

function displayDateAndTime() {
    document.getElementById("date-display").innerText = setCurrentDate();
    document.getElementById("time-display").innerText = setCurrentTime();
}

// Function to initiate the timer
function initiateTimer() {
    // Update the time and fetch weather data every minute
    setInterval(() => {
        document.getElementById("time-display").innerText = setCurrentTime();
        fetchWeather();
    }, 60000); // 60000 milliseconds = 1 minute
}

// Get milliseconds until the next minute
let now = new Date();
let delay = (60 - now.getSeconds()) * 1000;

// Use setTimeout to wait until the start of the next minute to initiate the setInterval
setTimeout(initiateTimer, delay);

// Automatically fetch weather on page load
document.addEventListener("DOMContentLoaded", () => {
    displayDateAndTime();
    fetchWeather();
});

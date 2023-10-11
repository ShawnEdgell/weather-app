import './style.css'

import { fetchWeather } from './modules/weather.js';

window.fetchWeather = fetchWeather;  // Make it accessible from the HTML button


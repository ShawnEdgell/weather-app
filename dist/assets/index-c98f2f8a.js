!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();window.fetchWeather=async function(){const e=`https://api.weatherapi.com/v1/current.json?key=219a015ee939448aa0f195825231010&q=${document.getElementById("location").value}`,t=await fetch(e);if(t.ok){const e=await t.json();document.getElementById("weather-display").innerText=`${e.location.name}: ${e.current.temp_c}°C`}else document.getElementById("weather-display").innerText="Error fetching weather data!"};
//# sourceMappingURL=index-c98f2f8a.js.map
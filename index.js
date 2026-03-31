"use strict";
const addressDiv = document.getElementById("address");
const temperatureDiv = document.getElementById("temperature");
const humidityDiv = document.getElementById("humidity");
const windDiv = document.getElementById("wind");
const precipitationsDiv = document.getElementById("precipitations");
const weatherData = document.querySelector(".weather-data");
const weatherIcon = document.querySelector(".weather-icon");
async function fetchWeatherData() {
    try {
        const cityInput = document.getElementById("cityName");
        const cityName = cityInput.value.toLowerCase();
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=KQYWTLZ3T34A25ZMDLD69TJM6`, { mode: "cors" });
        if (!response.ok) {
            throw new Error("Failed to Fetch the data");
        }
        const data = await response.json();
        console.log(data);
        const cityAddress = data.resolvedAddress;
        const cityTemperature = data.currentConditions.temp;
        const cityHumidity = data.currentConditions.humidity;
        const cityWind = data.currentConditions.windspeed;
        const precipitations = data.currentConditions.precipprob;
        const iconPath = data.currentConditions.icon;
        console.log(iconPath);
        setConditions({
            cityAddress,
            cityTemperature,
            cityHumidity,
            cityWind,
            precipitations,
            iconPath,
        });
    }
    catch (error) {
        alert("Failed to fetch weather data, please try again");
    }
}
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("cityName");
    const cityName = inputValue.value.trim();
    if (cityName.length < 2 || /\d/.test(cityName)) {
        alert("Please enter a valid city name");
    }
    else {
        fetchWeatherData();
    }
});
function setConditions(conditions) {
    const { cityAddress, cityTemperature, cityHumidity, cityWind, precipitations, iconPath, } = conditions;
    addressDiv.textContent = cityAddress;
    temperatureDiv.textContent = `Temperature: ${Math.round(convertToCelsius(cityTemperature))} °C`;
    humidityDiv.textContent = `Humidity: ${cityHumidity} %`;
    windDiv.textContent = `Wind Speed: ${cityWind} km/h`;
    precipitationsDiv.textContent = `Precipitations: ${precipitations} %`;
    weatherIcon.src = `weather-icons/${iconPath}.svg`;
    weatherData.style.display = "flex";
}
function convertToCelsius(temp) {
    let celsius = (temp - 32) / 1.8;
    return celsius;
}

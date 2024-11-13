const address = document.getElementById("address");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const precipitations = document.getElementById("precipitations");
const weatherData = document.querySelector(".weather-data");

async function fetchWeatherData() {
    try {
        const cityName = document.getElementById("cityName").value.toLowerCase();
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=KQYWTLZ3T34A25ZMDLD69TJM6`, {mode: "cors"})
    if (!response.ok) {
        throw new Error("Failed to Fetch the data");
        }
        
        const data = await response.json();
        console.log(data);

        const cityAddress = data.resolvedAddress;

        const cityTemperature = data.currentConditions.temp;
        
        const cityHumidity = data.currentConditions.humidity;

        const windSpeed = data.currentConditions.windspeed;

        const probabilityOfPrecipitation = data.currentConditions.precipprob;


        setConditions(cityAddress, cityTemperature, cityHumidity, windSpeed, probabilityOfPrecipitation);


    }
    catch (error) {
        alert("Failed to fetch weather data, please try again");
    }
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("cityName").value.trim();
    if (inputValue.length < 2 || /\d/.test(inputValue)) {
        alert("Please enter a valid city name")
    } else {
        fetchWeatherData();
    }
})


function setConditions(cityAddress, cityTemperature, cityHumidity, cityWind, cityPrecipitations) {
    address.textContent = cityAddress;
    temperature.textContent = `Temperature: ${Math.round(convertToCelsius(cityTemperature))} °C`;
    humidity.textContent = `Humidity: ${cityHumidity} %`;
    wind.textContent = `Wind Speed: ${cityWind} km/h`;
    precipitations.textContent = `Precipitations: ${cityPrecipitations} %`;
    weatherData.style.display = "flex";
}


function convertToCelsius(temp) {
    let celsius = (parseInt(temp) - 32) / 1.8;
    return celsius;
}


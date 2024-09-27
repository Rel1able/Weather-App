async function fetchWeatherData() {
    try {
        const cityName = document.getElementById("cityName").value.toLowerCase();
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=KQYWTLZ3T34A25ZMDLD69TJM6`, {mode: "cors"})
    if (!response.ok) {
        throw new Error("Failed to Fetch the data");
        }
        const data = await response.json();
        console.log(data);

        const cityAddress = data.timezone;

        const cityTemperature = data.currentConditions.temp;
        
        const cityHumidity = data.currentConditions.humidity;

        const windSpeed = data.currentConditions.windspeed;

        const probabilityOfPrecipitation = data.currentConditions.precipprob;

        console.log(cityAddress)
        console.log(cityTemperature);
        console.log(cityHumidity);
        console.log(windSpeed);
        console.log(probabilityOfPrecipitation);

    }
    catch (error) {
        console.error(error);
    }
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("cityName").value.trim();
    if (inputValue.length < 2) {
        alert("Please enter a valid city name")
    } else {
        fetchWeatherData();
    }
})



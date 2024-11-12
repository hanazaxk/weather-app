// Clear input on page refresh
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cityInput").value = "";
});

document.getElementById("getWeatherBtn").addEventListener("click", async function () {
    const city = document.getElementById("cityInput").value;
    if (!city) return;

    const weatherOutput = document.getElementById("weatherOutput");
    weatherOutput.style.display = "block";
    weatherOutput.textContent = "Loading...";

    try {
        // Fetch weather data (replace YOUR_API_KEY with a valid API key)
        // Replace YOUR_API_KEY with bd5e378503939ddaee76f12ad7a97608 if you don't have one
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        const timezoneOffset = data.timezone * 1000;
        const localTime = new Date(Date.now() + timezoneOffset).toUTCString().slice(-12, -4);
        
        const temperatureCelsius = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        
        weatherOutput.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${weatherDescription}">
            <p>${data.name}</p>
            <p>${weatherDescription}</p>
            <p><span id="temperature">${temperatureCelsius}°C</span> <button id="toggleTemp">°F</button></p>
            <p>Local Time: ${localTime}</p>
        `;

        document.getElementById("toggleTemp").addEventListener("click", function () {
            const tempSpan = document.getElementById("temperature");
            const isCelsius = tempSpan.textContent.includes("°C");
            const tempValue = parseFloat(tempSpan.textContent);
            if (isCelsius) {
                tempSpan.textContent = `${(tempValue * 9/5 + 32).toFixed(1)}°F`;
                this.textContent = "°C";
            } else {
                tempSpan.textContent = `${((tempValue - 32) * 5/9).toFixed(1)}°C`;
                this.textContent = "°F";
            }
        });

    } catch (error) {
        weatherOutput.textContent = "Error: " + error.message;
    }
});

// Autocomplete city suggestions
document.getElementById("cityInput").addEventListener("input", async function () {
    const city = this.value;
    if (city.length < 2) return;

    try {
        // Fetch city suggestions from Teleport API
        const response = await fetch(`https://api.teleport.org/api/cities/?search=${city}&limit=5`);
        const data = await response.json();

        let suggestionsContainer = document.getElementById("suggestions");
        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement("div");
            suggestionsContainer.id = "suggestions";
            this.parentNode.appendChild(suggestionsContainer);
        }
        suggestionsContainer.innerHTML = "";

        // Check if the API response has suggestions and render them
        if (data._embedded && data._embedded["city:search-results"]) {
            data._embedded["city:search-results"].forEach(cityResult => {
                const suggestion = document.createElement("div");
                suggestion.className = "suggestion";
                suggestion.textContent = cityResult.matching_full_name;
                suggestion.addEventListener("click", () => {
                    document.getElementById("cityInput").value = cityResult.matching_full_name;
                    suggestionsContainer.innerHTML = ""; // Clear suggestions
                });
                suggestionsContainer.appendChild(suggestion);
            });
        }

    } catch (error) {
        console.log("Error fetching city suggestions:", error);
    }
});


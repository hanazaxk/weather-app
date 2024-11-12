## Weather App

This Weather App allows users to search for city-specific weather information. The app displays real-time temperature, weather conditions, local time, and more, while providing a convenient autocomplete feature for city names.

### Features

* **Current Weather Information**: Get temperature, weather condition, and an icon for the selected city.
* **Local Time Calculation**: Displays the local time of the selected city based on its timezone.
* **Temperature Conversion**: Toggle between Celsius and Fahrenheit.
* **City Autocomplete**: Suggests city names as you type for easy selection.
* **Error Handling**: Displays user-friendly error messages if the city is not found.

### Technologies Used

* **HTML/CSS**: For basic layout and styling.
* **JavaScript**: For app functionality, API requests, and interactivity.
* **OpenWeather API**: Fetches weather data.
* **Teleport API**: Provides city name suggestions for the autocomplete feature.

### Setup and Installation

1. **Clone the Repository**:

   ```bash
git clone https://github.com/hanazaxk/weather-app.git
cd weather-app
```

2. **Get API Keys**:
   * **OpenWeather API**: Sign up at OpenWeather to get an API key.
3. **Configure API Key**:
   Replace `YOUR_API_KEY` in `script.js` with your OpenWeather API key:
   ```javascript
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
```
4. **Run the Project**:
   Open the `index.html` file in a web browser to start using the app.

### File Structure

* `index.html`: The main HTML file containing the basic structure.
* `styles.css`: CSS file for styling the app.
* `script.js`: JavaScript file containing the app logic for fetching weather data, handling autocomplete, and updating the UI.

### Usage

1. **Enter City Name**: Start typing a city name in the input field. Autocomplete suggestions will appear below the input.
2. **Select or Type City**: Choose a suggestion or finish typing the city name.
3. **Get Weather**: Click the Get Weather button to fetch and display the weather information.
4. **Toggle Temperature Unit**: Click the °F or °C button to switch between Celsius and Fahrenheit.
5. **Clear Input on Reload**: The input field clears automatically whenever the page is refreshed.

### Troubleshooting

* **No Suggestions**: If autocomplete isn’t working, check your internet connection and make sure the Teleport API URL is reachable.
* **City Not Found**: If the city is not found, an error message will be displayed in place of the weather data.

### Future Improvements

* **Extended Forecast**: Add a 5-day forecast feature.
* **Geolocation**: Detect the user’s location to show local weather automatically.
* **Historical Weather Data**: Provide options to see past weather data for a selected date.
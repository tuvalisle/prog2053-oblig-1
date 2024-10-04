document.addEventListener("DOMContentLoaded", () => {
    const weatherContainer = document.getElementById("weather");

    // List of cities with latitude and longitude
    const locations = [
        { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
        { name: "New York", lat: 40.7128, lon: -74.0060 },
        { name: "London", lat: 51.5074, lon: -0.1278 },
        { name: "Sydney", lat: -33.8688, lon: 151.2093 },
        { name: "Paris", lat: 48.8566, lon: 2.3522 },
        { name: "Oslo", lat: 59.9127, lon: 10.7461}
    ];

    // Function to fetch weather data
    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const data = await response.json();
            return data.current_weather;
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // Function to display weather data
    const displayWeather = async () => {
        weatherContainer.innerHTML = ""; // Clear existing data

        for (const location of locations) {
            const weather = await fetchWeather(location.lat, location.lon);
            const weatherElement = document.createElement("div");
            weatherElement.classList.add("weather-box");
            weatherElement.innerHTML = `
                <h3>${location.name}</h3>
                <p>Temperature: ${weather.temperature}°C</p>
                <p>Wind Speed: ${weather.windspeed} km/h</p>
            `;
            weatherContainer.appendChild(weatherElement);
        }
    };

    // Update the weather data every 60 seconds
    setInterval(displayWeather, 60000);

    // Initial weather display
    displayWeather();
});

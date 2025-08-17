import fetch from "node-fetch";

const getWeather = async (req, res) => {
    try {
        const { city = "New York" } = req.query;
        
        if (!process.env.WEATHER_API_KEY) {
            return res.status(500).json({
                message: "Weather API key not configured"
            });
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );

        if (!response.ok) {
            return res.status(404).json({
                message: "City not found or weather data unavailable"
            });
        }

        const data = await response.json();
        
        const weatherData = {
            city: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            feelsLike: Math.round(data.main.feels_like),
            pressure: data.main.pressure
        };

        res.json(weatherData);
    } catch (err) {
        console.error("Weather API error:", err.message);
        res.status(500).json({
            message: "Failed to fetch weather data"
        });
    }
};

export default { getWeather };
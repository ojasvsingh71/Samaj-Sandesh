import fetch from "node-fetch";

// Weather code mappings for Open-Meteo
const weatherCodeMap = {
  0: { description: "Clear sky", icon: "01d" },
  1: { description: "Mainly clear", icon: "01d" },
  2: { description: "Partly cloudy", icon: "02d" },
  3: { description: "Overcast", icon: "03d" },
  45: { description: "Fog", icon: "50d" },
  48: { description: "Depositing rime fog", icon: "50d" },
  51: { description: "Light drizzle", icon: "09d" },
  53: { description: "Moderate drizzle", icon: "09d" },
  55: { description: "Dense drizzle", icon: "09d" },
  56: { description: "Light freezing drizzle", icon: "09d" },
  57: { description: "Dense freezing drizzle", icon: "09d" },
  61: { description: "Slight rain", icon: "10d" },
  63: { description: "Moderate rain", icon: "10d" },
  65: { description: "Heavy rain", icon: "10d" },
  66: { description: "Light freezing rain", icon: "10d" },
  67: { description: "Heavy freezing rain", icon: "10d" },
  71: { description: "Slight snow fall", icon: "13d" },
  73: { description: "Moderate snow fall", icon: "13d" },
  75: { description: "Heavy snow fall", icon: "13d" },
  77: { description: "Snow grains", icon: "13d" },
  80: { description: "Slight rain showers", icon: "09d" },
  81: { description: "Moderate rain showers", icon: "09d" },
  82: { description: "Violent rain showers", icon: "09d" },
  85: { description: "Slight snow showers", icon: "13d" },
  86: { description: "Heavy snow showers", icon: "13d" },
  95: { description: "Thunderstorm", icon: "11d" },
  96: { description: "Thunderstorm with slight hail", icon: "11d" },
  99: { description: "Thunderstorm with heavy hail", icon: "11d" }
};

// Function to get coordinates from city name using Open-Meteo's geocoding API
const getCoordinates = async (city) => {
  console.log(city);
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

  const response = await fetch(geocodeUrl);
  if (!response.ok) {
    throw new Error('Failed to geocode city');
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error('City not found');
  }
  console.log(data.results)
  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
    name: data.results[0].name,
    country: data.results[0].country || data.results[0].country_code
  };
};

const getWeather = async (req, res) => {
  try {
    let { city = "New York", lat, lon } = req.query;
    let locationInfo = {};

    // If coordinates are provided, use them directly
    if (lat && lon) {
      locationInfo = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        name: city || "Current Location",
        country: ""
      };
    } else {
      // Otherwise, geocode the city name
      locationInfo = await getCoordinates(city);
    }

    // Fetch weather data from Open-Meteo
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${locationInfo.latitude}&longitude=${locationInfo.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure&timezone=auto`;

    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    // Map weather code to description and icon
    const weatherInfo = weatherCodeMap[current.weather_code] || {
      description: "Unknown",
      icon: "01d"
    };

    const formattedWeather = {
      city: locationInfo.name,
      country: locationInfo.country,
      temperature: Math.round(current.temperature_2m),
      description: weatherInfo.description,
      icon: weatherInfo.icon,
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m * 10) / 10, // Round to 1 decimal
      feelsLike: Math.round(current.apparent_temperature),
      pressure: Math.round(current.surface_pressure),
      weatherCode: current.weather_code
    };

    res.json(formattedWeather);
  } catch (err) {
    console.error("Weather API error:", err.message);
    res.status(500).json({
      message: err.message === 'City not found' ? 'City not found' : 'Failed to fetch weather data'
    });
  }
};

export default { getWeather };
import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Eye, MapPin, RefreshCw } from 'lucide-react';
import api from '../api/axios';
import AnimatedCard from './AnimatedCard';

const weatherIcons = {
  '01d': Sun,
  '01n': Sun,
  '02d': Cloud,
  '02n': Cloud,
  '03d': Cloud,
  '03n': Cloud,
  '04d': Cloud,
  '04n': Cloud,
  '09d': CloudRain,
  '09n': CloudRain,
  '10d': CloudRain,
  '10n': CloudRain,
  '11d': CloudRain,
  '11n': CloudRain,
  '13d': CloudSnow,
  '13n': CloudSnow,
  '50d': Cloud,
  '50n': Cloud,
};

export default function WeatherWidget({ city = "New York" }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState(city);
  const [inputCity, setInputCity] = useState(city);

  const fetchWeather = async (cityName = searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/weather/current?city=${encodeURIComponent(cityName)}`);
      setWeather(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [searchCity]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setSearchCity(inputCity.trim());
    }
  };

  const WeatherIcon = weather ? weatherIcons[weather.icon] || Cloud : Cloud;

  if (loading) {
    return (
      <AnimatedCard className="bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Loading weather...</span>
        </div>
      </AnimatedCard>
    );
  }

  if (error) {
    return (
      <AnimatedCard className="bg-gradient-to-br from-red-400 to-red-600 dark:from-red-600 dark:to-red-800 text-white p-6 rounded-2xl shadow-lg">
        <div className="text-center">
          <Cloud className="w-12 h-12 mx-auto mb-2 opacity-70" />
          <p className="font-medium mb-2">Weather Unavailable</p>
          <p className="text-sm opacity-90">{error}</p>
          <button
            onClick={() => fetchWeather()}
            className="mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-300 text-sm"
          >
            Try Again
          </button>
        </div>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-300"
            >
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Main weather info */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-lg font-semibold">{weather.city}, {weather.country}</span>
            </div>
            <div className="text-3xl font-bold">{weather.temperature}°C</div>
            <div className="text-sm opacity-90 capitalize">{weather.description}</div>
          </div>
          <div className="text-right">
            <WeatherIcon className="w-16 h-16 mb-2" />
            <button
              onClick={() => fetchWeather()}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-300"
              title="Refresh weather"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            <span>Feels like {weather.feelsLike}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            <span>{weather.humidity}% humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4" />
            <span>{weather.windSpeed} m/s wind</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{weather.pressure} hPa</span>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}
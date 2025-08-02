// App.jsx
import { useState } from "react";

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api?city=${city}`);
      const data = await response.json();

      if (data.error || !data.main) {
        setError(data.error || 'City not found');
        setWeather(null);
      } else {
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          name: data.name
        });
      }
    } catch (err) {
      setError('Failed to fetch weather');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🌦️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '1rem' }}
      />
      <button onClick={fetchWeather} style={{ padding: '0.5rem 1rem' }}>
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <h2>{weather.name}</h2>
          <p>🌡️ Temperature: {weather.temp}°C</p>
          <p>📝 Description: {weather.description}</p>
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather icon" />
        </div>
      )}
    </div>
  );
};

export default App;
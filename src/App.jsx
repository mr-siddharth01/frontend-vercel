// App.jsx
import { useState, useEffect } from "react";

const App = () => {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://backend-api1-k68w.onrender.com/api?city=${city}`);
      const data = await response.json();

      if (data.error || !data.main) {
        setError(data.error || "City not found");
        setWeather(null);
      } else {
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          name: data.name,
        });
      }
    } catch (err) {
      setError("Failed to fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on initial load
  useEffect(() => {
    fetchWeather();
  }, []);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>🌦️ Weather App</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Get Weather
        </button>
      </div>

      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {weather && (
        <div
          style={{
            marginTop: "2rem",
            background: "#f0f0f0",
            padding: "1rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2>{weather.name}</h2>
          <p>🌡️ Temperature: {weather.temp}°C</p>
          <p>📝 Description: {weather.description}</p>
          {weather.icon ? (
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Weather icon"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            <p>No icon available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
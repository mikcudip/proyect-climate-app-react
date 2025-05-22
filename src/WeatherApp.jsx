import { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  // 'https://api.openweathermap.org/data/2.5/weather?q=Lima&lang=es&units=metric&appid=cd61c3dab32bc61ad3e51837deb18854'
  const URL_BASE = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "cd61c3dab32bc61ad3e51837deb18854";
  const UNITS = "metric";
  const LANG = "es";
  let targetURL = `${URL_BASE}?q=${city}&lang=${LANG}&units=${UNITS}&appid=${API_KEY}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const handleCityChange = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(targetURL);
      const data = await response.json();
      setWeatherData(data);
    } catch (mistake) {
      console.error("Algo salio mal:" + mistake);
      return;
    }
  };

  return (
    <div className="container">
      <h1>Aplicación de clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Buscar</button>
      </form>
      {weatherData && weatherData.cod === 200 && (
        <div>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
            La temperatura actual en esa ubicacion es: {weatherData.main.temp}°C
          </p>
          <p>
            La condicion meteorologica actual es:{" "}
            {weatherData.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

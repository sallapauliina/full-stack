import React from "react";
import { useState, useEffect } from "react";
import { getAllWeather } from "../service/weatherData";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getAllWeather(country.capital[0]);
      setWeather(data);
    };

    fetchWeather();
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} width="130" height="100" />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <div>Temperature: {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;

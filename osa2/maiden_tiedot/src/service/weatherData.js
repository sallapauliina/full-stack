import axios from "axios";

const api = import.meta.env.VITE_WEATHER_API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather`;

export const getAllWeather = (capital) => {
  const request = axios.get(`${url}?q=${capital}&units=metric&appid=${api}`);
  return request.then((response) => response.data);
};

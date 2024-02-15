import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_KEY;
const baseUrl = "https://api.openweathermap.org";

const getWeatherCondition = (latitude, longitude) => {
  return axios
    .get(
      `${baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    )
    .then((response) => response.data);
};

const getWeatherIcon = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export default { getWeatherCondition, getWeatherIcon };

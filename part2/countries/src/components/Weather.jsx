import temperature from "../helpers/temperature";
import weatherApi from "../services/weather";

const Weather = ({ countryName, weather }) => {
  if (!weather) return;

  const { kelvinToCelsius } = temperature;
  const { getWeatherIcon } = weatherApi;

  return (
    <div>
      <h3>Weather in {countryName}</h3>
      <p>temperature {kelvinToCelsius(weather.main.temp)} Celsius</p>
      <img src={getWeatherIcon(weather.weather[0].icon)} alt="" />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;

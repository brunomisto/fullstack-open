import weatherApi from "../services/weather";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const [latitude, longitude] = country.latlng;
    weatherApi.getWeatherCondition(latitude, longitude).then((weatherObj) => {
      setWeather(weatherObj);
    });
  }, [country.latlng]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>{country.capital ? `capital ${country.capital[0]}` : ""}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map(([abbr, language]) => (
          <li key={abbr}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
      <Weather countryName={country.name.common} weather={weather} />
    </div>
  );
};

export default Country;

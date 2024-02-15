import { useState, useEffect } from "react";

import Search from "./components/Search";
import CountryList from "./components/CountryList";

import countriesApi from "./services/countries";

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    countriesApi.getAll().then((countryList) => {
      console.log(countryList);
      setCountries(countryList);
    });
  }, []);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <Search value={country} onChange={handleCountryChange} />
      <CountryList
        query={country}
        countries={countries}
        setCountry={setCountry}
      />
    </div>
  );
};

export default App;

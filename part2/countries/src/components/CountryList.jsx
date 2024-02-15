import Country from "./Country";

const CountryList = ({ query, countries }) => {
  if (!countries) return;

  const countriesToShow = countries.filter((country) => {
    const lowerCaseCountry = country.name.common.toLowerCase();
    return lowerCaseCountry.includes(query.toLowerCase());
  });

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countriesToShow.length === 1) {
    return <Country country={countriesToShow[0]} />;
  }

  const foundCountry = countriesToShow.find(
    (country) => country.name.common.toLowerCase() === query.toLowerCase()
  );
  if (foundCountry) {
    return <Country country={foundCountry} />;
  }

  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.flag}>{country.name.common}</li>
      ))}
    </ul>
  );
};

export default CountryList;

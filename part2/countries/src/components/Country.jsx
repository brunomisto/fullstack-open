const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
      </p>
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map(([abbr, language]) => (
          <li key={abbr}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
    </div>
  );
};

export default Country;

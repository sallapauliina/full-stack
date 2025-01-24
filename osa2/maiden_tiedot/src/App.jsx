import { useState, useEffect } from "react";
import axios from "axios";
import countryService from "./service/countryData";
import { getAllWeather } from "./service/weatherData";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    const search = event.target.value.toLowerCase();

    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search)
    );
    setFilteredCountries(results);
    setShow(false);
  };

  const handleShow = (country) => {
    setShow(country);
  };

  const Countries = () => {
    if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter!</div>;
    } else if (filteredCountries.length === 1) {
      return <CountryInfo country={filteredCountries[0]} />;
    } else if (filteredCountries.length > 1) {
      return filteredCountries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => handleShow(country)}>show</button>
          {show === country && <CountryInfo country={country} />}
        </li>
      ));
    } else if (search.length > 0) {
      return <div>No matches.</div>;
    }
  };

  return (
    <div>
      <form>
        <div>
          Find countries: <input value={search} onChange={handleSearchChange} />
        </div>
      </form>
      {Countries()}
    </div>
  );
};

export default App;

import { React, useState } from "react";
import { Container } from "semantic-ui-react";
import LocationList from "./LocationList";
import LocationView from "./LocationView";
import SearchBar from "./SearchBar";
import sugarbudget from "../apis/sugarbudget";
import "../styles/App.css";

const App = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const onTermSubmit = async (term) => {
    setLoading(true);
    setSelectedLocation(null);
    const res = await sugarbudget
      .get("/location/search", {
        params: { location: term },
        timeout: 3000,
      })
      .catch((err) => {
        if (err.response) setError(true);
      });
    if (res?.status === 200) {
      setLocations(res.data.data);
      setError(false);
    } else setError(true);
    setLoading(false);
  };

  const onLocationSelect = (location) => {
    setLocations([]);
    setSelectedLocation(location);
  };

  return (
    <Container className="search-container">
      <SearchBar onTermSubmit={onTermSubmit} />
      {selectedLocation ? (
        <LocationView location={selectedLocation} />
      ) : (
        <LocationList
          error={error}
          loading={loading}
          locations={locations}
          onLocationSelect={onLocationSelect}
        />
      )}
    </Container>
  );
};

export default App;

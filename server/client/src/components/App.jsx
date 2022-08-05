import { React, useState } from "react";
import { Container } from "semantic-ui-react";
import LocationList from "./LocationList";
import LocationView from "./LocationView";
import SearchBar from "./SearchBar";
import sugarbudget from "../apis/sugarbudget";
import "../styles/App.css";

const App = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [menuData, setMenuData] = useState({});

  const onDateSubmit = async (date) => {
    const res = await sugarbudget.get("/school", {
      params: {
        school: selectedLocation.physicalLocationLookup,
        startDate: date.start,
        endDate: date.end,
      },
    });
    setMenuData(res.data);
  };

  const onTermSubmit = async (term) => {
    setLocations([]);
    setSelectedLocation(null);
    const res = await sugarbudget.get("/location/search", {
      params: { location: term },
    });
    setLocations(res.data.data);
  };

  const onLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <Container>
      <SearchBar onTermSubmit={onTermSubmit} />
      {selectedLocation ? (
        <LocationView location={selectedLocation} />
      ) : (
        <LocationList
          locations={locations}
          onLocationSelect={onLocationSelect}
        />
      )}
    </Container>
  );
};

export default App;

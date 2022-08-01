import { React, useState } from "react";
import SearchBar from "./SearchBar";
import sugarbudget from "../apis/sugarbudget";
import "../styles/App.css";

const App = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [menuData, setMenuData] = useState({});

  const onTermSubmit = async (term) => {
    const res = await sugarbudget.get("/location/search", {
      params: { location: term },
    });
    setLocations(res.data.data);
  };

  const onLocationSelct = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div>
      <SearchBar onTermSubmit={onTermSubmit} />
    </div>
  );
};

export default App;

import React from "react";
import { Card } from "semantic-ui-react";
import LocationItem from "./LocationItem";

const LocationList = ({ locations, onLocationSelect }) => {
  const renderedList = locations.map((location) => {
    return (
      <LocationItem
        key={location.id}
        onLocationSelect={onLocationSelect}
        location={location}
      />
    );
  });
  return (
    <Card.Group itemsPerRow={4} stackable={true}>
      {renderedList}
    </Card.Group>
  );
};

export default LocationList;

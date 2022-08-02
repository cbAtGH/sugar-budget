import React from "react";
import { Card, Container, Grid } from "semantic-ui-react";
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
    <Card.Group itemsPerRow={4} textAlign="center" stackable>
      {renderedList}
    </Card.Group>
  );
};

export default LocationList;

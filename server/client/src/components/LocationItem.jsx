import React from "react";
import { Card } from "semantic-ui-react";

const LocationItem = ({ onLocationSelect, location }) => {
  return (
    <Card onClick={() => onLocationSelect(location)}>
      <Card.Content
        header={location.name}
        meta={`${location.city}, ${location.state}`}
      />
    </Card>
  );
};

export default LocationItem;

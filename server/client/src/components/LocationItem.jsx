import React from "react";
import { Card } from "semantic-ui-react";
import "../styles/LocationItem.css";

const LocationItem = ({ onLocationSelect, location }) => {
  return (
    <Card onClick={() => onLocationSelect(location)} className="location-card">
      <Card.Content
        className="location-card-content"
        header={location.name}
        meta={`${location.city}, ${location.state}`}
      />
    </Card>
  );
};

export default LocationItem;

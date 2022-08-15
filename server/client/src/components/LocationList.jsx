import React from "react";
import { Card, Dimmer, Loader, Header, Icon, Segment } from "semantic-ui-react";
import LocationItem from "./LocationItem";

const LocationList = ({ error, loading, locations, onLocationSelect }) => {
  const renderedList = locations.map((location) => {
    return (
      <LocationItem
        key={location.id}
        onLocationSelect={onLocationSelect}
        location={location}
      />
    );
  });
  return loading || error ? (
    <Segment placeholder>
      {loading ? (
        <Dimmer active inverted>
          <Loader indeterminate>Attempting to retrieve info</Loader>
        </Dimmer>
      ) : (
        <Header icon textAlign="center">
          <Icon name="exclamation triangle" size="small" />
          Failed to retrieve data, please wait a moment and try again.
        </Header>
      )}
    </Segment>
  ) : (
    <Card.Group itemsPerRow={4} stackable={true}>
      {renderedList}
    </Card.Group>
  );
};

export default LocationList;

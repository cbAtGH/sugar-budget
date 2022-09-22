import React from "react";
import { Card, Dimmer, Header, Icon, Loader, Segment } from "semantic-ui-react";
import MenuItem from "./MenuItem";

const MenuItemList = ({ period, data, loading, error }) => {
  const renderedList =
    data == null || Object.keys(data[period]).length === 0
      ? []
      : data[period].sugarTotals[0].totals.map((meal) => {
          return (
            <MenuItem
              key={meal.mealBlock}
              size={150}
              indicatorWidth={20}
              trackWidth={20}
              progress={meal.total != null ? meal.total / 7 : 0}
              total={meal.total}
              mealBlock={meal.mealBlock}
            />
          );
        });
  let renderContent;
  if (loading || error) {
    renderContent = (
      <Segment placeholder style={{ marginBottom: 5 }}>
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
    );
  } else if (renderedList.length > 0) {
    renderContent = (
      <Card.Group
        itemsPerRow={4}
        textAlign="center"
        style={{ marginBottom: 5 }}
        stackable
      >
        {renderedList}
      </Card.Group>
    );
  } else {
    renderContent = (
      <Segment placeholder style={{ marginBottom: 5 }}>
        <Header icon>
          <Icon name="question circle outline" />
          No nutritional data provided
        </Header>
      </Segment>
    );
  }
  return renderContent;
};

export default MenuItemList;

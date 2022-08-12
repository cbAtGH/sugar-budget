import React from "react";
import { Card, Header, Icon, Segment } from "semantic-ui-react";
import MenuItem from "./MenuItem";

const MenuItemList = ({ period, data }) => {
  console.log("MenuItemList Data: ", data);
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
  return renderedList.length > 0 ? (
    <Card.Group itemsPerRow={4} textAlign="center" stackable>
      {renderedList}
    </Card.Group>
  ) : (
    <Segment placeholder>
      <Header icon>
        <Icon name="question circle outline" />
        No nutritional data provided
      </Header>
    </Segment>
  );
};

export default MenuItemList;

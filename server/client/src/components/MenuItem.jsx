import React from "react";
import { Card, Header, Icon, Segment } from "semantic-ui-react";
import ProgressRing from "./ProgressRing";

const MenuItem = ({ radius, stroke, progress, mealBlock, total }) => {
  let content = (
    <Card.Content>
      <ProgressRing radius={radius} stroke={stroke} progress={progress} />
      <Card.Header textAlign="center">{`${total}g Sugar`}</Card.Header>
      <Card.Meta textAlign="center">{mealBlock}</Card.Meta>
    </Card.Content>
  );
  if (total === 0 || total == null) {
    content = (
      <Segment placeholder>
        <Header icon textAlign="center">
          <Icon name="question circle outline" />
          No nutritional data provided
        </Header>
      </Segment>
    );
  }
  return <Card>{content}</Card>;
};

export default MenuItem;

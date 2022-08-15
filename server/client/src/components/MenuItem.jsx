import React from "react";
import { Card, Header, Icon, Segment } from "semantic-ui-react";
import ProgressRing from "./ProgressRing";

const MenuItem = ({
  size,
  indicatorWidth,
  trackWidth,
  progress,
  mealBlock,
  total,
}) => {
  let content = (
    <Card.Content textAlign="center">
      <ProgressRing
        size={size}
        indicatorWidth={indicatorWidth}
        trackWidth={trackWidth}
        progress={progress}
        total={total}
      />
      <Card.Meta>{mealBlock}</Card.Meta>
    </Card.Content>
  );
  if (total === 0 || total == null) {
    content = (
      <Segment placeholder>
        <Header icon textAlign="center">
          <Icon name="question circle outline" size="small" />
          No nutritional data provided
        </Header>
      </Segment>
    );
  }
  return <Card>{content}</Card>;
};

export default MenuItem;

import React from "react";
import { Grid, Header, Statistic } from "semantic-ui-react";

const ReportContent = ({ report }) => {
  const groups = report ? Object.keys(report) : [];
  const mappedGroups =
    groups.length === 0
      ? ""
      : groups.map((group, i) => {
          return (
            <Grid.Column key={i}>
              <Header>{group.charAt(0).toUpperCase() + group.slice(1)}</Header>
              <Statistic.Group horizontal={true}>
                <Statistic color="green" size="tiny">
                  <Statistic.Value>{report[group]?.passed}</Statistic.Value>
                  <Statistic.Label>passed</Statistic.Label>
                </Statistic>
                <Statistic color="yellow" size="tiny">
                  <Statistic.Value>{report[group]?.borderline}</Statistic.Value>
                  <Statistic.Label>borderline</Statistic.Label>
                </Statistic>
                <Statistic color="red" size="tiny">
                  <Statistic.Value>{report[group]?.failed}</Statistic.Value>
                  <Statistic.Label>failed</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
          );
        });
  return (
    <Grid columns={3} verticalAlign="middle">
      <Grid.Row>{mappedGroups}</Grid.Row>
    </Grid>
  );
};

export default ReportContent;

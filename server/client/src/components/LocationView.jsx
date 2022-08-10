import { useState, React } from "react";
import { Container, Header, Tab } from "semantic-ui-react";
import { DateTime } from "luxon";
import MenuItem from "./MenuItem";
import MenuGraph from "./MenuGraph";
import sugarbudget from "../apis/sugarbudget";

const periods = ["day", "week", "month", "year"];

const LocationView = ({ location }) => {
  const [menuData, setMenuData] = useState({
    day: {},
    week: {},
    month: {},
    year: {},
  });

  const getMenuForDate = async (date, period) => {
    const res = await sugarbudget.get("/school", {
      params: {
        school: location.physicalLocationLookup,
        startDate: date.start,
        endDate: date.end,
      },
    });
    setMenuData({ ...menuData, [period]: res.data });
  };

  const handleChange = (e, data) => {
    const period = periods[data.activeIndex];
    const dt = DateTime.now().startOf(period);
    if (Object.keys(menuData[period]).length === 0) {
      getMenuForDate(
        {
          start: dt.toFormat("LL-dd-yyyy"),
          end: dt.endOf(period).toFormat("LL-dd-yyyy"),
        },
        period
      );
    }
  };

  const panes = [
    {
      menuItem: "Day",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuItem period="day" data={menuData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Week",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuGraph period="week" data={menuData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Month",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuGraph period="month" data={menuData} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Year",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuGraph period="year" data={menuData} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container>
      <Header>
        {location.name}
        <Header.Subheader>{`${location.city}, ${location.state}`}</Header.Subheader>
      </Header>
      <Tab
        menu={{ attached: false, tabular: false }}
        panes={panes}
        onTabChange={handleChange}
      />
    </Container>
  );
};

export default LocationView;

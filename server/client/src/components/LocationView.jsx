import { useEffect, useState, React } from "react";
import { Container, Header, Tab } from "semantic-ui-react";
import { DateTime } from "luxon";
import MenuItemList from "./MenuItemList";
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

  const getMenuHelper = (date, period) => {
    getMenuForDate(
      {
        start: date.toFormat("LL-dd-yyyy"),
        end: date.endOf(period).toFormat("LL-dd-yyyy"),
      },
      period
    );
  };

  const getMenuForDate = async (date, period) => {
    setLoading = true;
    const res = await sugarbudget.get("/school", {
      params: {
        school: location.physicalLocationLookup,
        startDate: date.start,
        endDate: date.end,
      },
    });
    setMenuData({ ...menuData, [period]: res.data });
    setLoading = false;
  };

  const handleChange = (e, data) => {
    const period = periods[data.activeIndex];
    const dt = DateTime.now().startOf(period);
    if (Object.keys(menuData[period]).length === 0) {
      getMenuHelper(dt, period);
    }
  };

  useEffect(() => {
    // const dt = DateTime.fromObject({ year: 2022, month: 4, day: 12 });
    const dt = DateTime.now().startOf("day");
    getMenuHelper(dt, "day");
  }, []);

  const panes = [
    {
      menuItem: "Day",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuItemList period="day" data={menuData} />
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

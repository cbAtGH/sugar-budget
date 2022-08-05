import { useState, React } from "react";
import { Container, Header, Tab } from "semantic-ui-react";
import MenuItem from "./MenuItem";
import MenuGraph from "./MenuGraph";

const LocationView = ({ location }) => {
  const [selectedView, setSelectedView] = useState(null);
  const [menuData, setMenuData] = useState({
    Day: {},
    Week: {},
    Month: {},
    Year: {},
  });

  const getMenuForDate = async (date) => {
    const res = await sugarbudget.get("/school", {
      params: {
        school: selectedLocation.physicalLocationLookup,
        startDate: date.start,
        endDate: date.end,
      },
    });
    setMenuData(res.data);
  };

  const panes = [
    {
      menuItem: "Day",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuItem period="Day" location={location} getMenu={getMenuForDate} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Week",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuGraph
            period="Week"
            location={location}
            getMenu={getMenuForDate}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Month",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuGraph
            period="Month"
            location={location}
            getMenu={getMenuForDate}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Year",
      render: () => (
        <Tab.Pane attached={false}>
          <MenuGraph
            period="Year"
            location={location}
            getMenu={getMenuForDate}
          />
        </Tab.Pane>
      ),
    },
  ];
  console.log(location);
  return (
    <Container>
      <Header>
        {location.name}
        <Header.Subheader>{`${location.city}, ${location.state}`}</Header.Subheader>
      </Header>
      <Tab menu={{ attached: false, tabular: false }} panes={panes} />
    </Container>
  );
};

export default LocationView;

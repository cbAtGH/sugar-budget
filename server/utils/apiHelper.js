import mv from "../api/mealviewer.js";

const reportError = (err) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log("Error with request: ", e.nessage);
  }
};

const requestDailyMenuData = async ({ school, startDate, endDate }) => {
  //TODO: Check and utilize user-specified start and end dates instead of defaulting
  const querySchool = school.split(" ").join("");
  const parseDate = (date) => {
    return new Date(date).toLocaleDateString().split("/").join("-");
  };
  const start = startDate || parseDate(Date.now());
  const end = endDate || startDate;
  const queryDates = `${start}/${end}`;
  const url = `/school/${querySchool}/${queryDates}`;
  const { data } = await mv.get(url).catch((err) => {
    reportError(err);
  });

  return data;
};

const requestLocationData = async ({ location }) => {
  const url = `/physicalLocation/search/${location}`;
  const { data } = await mv.get(url).catch((err) => {
    reportError(err);
  });

  return data;
};

const transformDailyMenuData = (data) => {
  let meals = { dailyMenu: [], scheduledMeals: [] };
  const unitRgx = /([^)]+)\s\(([^)]+)\)/;
  const extractNutritionData = (foodItemData) => {
    let foodItems = [];
    for (const {
      item_Name,
      item_Type,
      nutritionals,
      portionQuantity,
      portionSize,
    } of foodItemData) {
      let nutritionData = Object.fromEntries(
        nutritionals.reduce((result, { name, rawValue, value }) => {
          const match = name.match(unitRgx);
          if (rawValue !== null)
            result.push([
              match ? match[1] : name,
              { value: value, units: match ? match[2] : null },
            ]);
          else result.push([name, { value: null, units: null }]);
          return result;
        }, [])
      );
      foodItems.push({
        item_Name: item_Name,
        item_Type: item_Type,
        portionQuantity: portionQuantity,
        portionSize: portionSize,
        nutritionals: nutritionData,
      });
    }
    return foodItems;
  };

  for (const dailyMenu of data.dailyMenus) {
    let items = extractNutritionData(dailyMenu.items);
    meals.dailyMenu = [
      ...meals.dailyMenu,
      ...JSON.parse(JSON.stringify(items)),
    ];
  }

  for (const menuSchedule of data.menuSchedules) {
    let schedule = { date: menuSchedule.dateInformation, meals: [] };
    for (const { blockName, cafeteriaLineList } of menuSchedule.menuBlocks) {
      let items = extractNutritionData(
        cafeteriaLineList.data[0].foodItemList.data
      );
      const meal = { [blockName]: items };
      schedule.meals.push(meal);
    }
    meals.scheduledMeals.push(schedule);
  }

  return meals;
};

export { requestDailyMenuData, requestLocationData, transformDailyMenuData };

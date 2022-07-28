import mv from "../api/mealviewer.js";

/**
 * Helper function to log errors
 * @param {object} err - error object from calling function
 */
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

/**
 * Make menu API request to mealviewer
 * @param {object} query - Menu query object passed from front end. Destructured out into school, startDate, and endDate query terms
 * @returns {object} JSON payload containing all of the date and meal information for the requested period
 */
const requestDailyMenuData = async ({ school, startDate, endDate }) => {
  const querySchool = school.split(" ").join("");
  const parseDate = (date) => {
    return new Date(date).toLocaleDateString().split("/").join("-");
  };
  const start = startDate || parseDate(Date.now());
  const end = endDate || startDate;
  if (end < start) [start, end] = [end, start]; // Swap dates under the assumption that end date was unintentionally before start date
  const queryDates = `${start}/${end}`;
  const url = `/school/${querySchool}/${queryDates}`;
  const { data } = await mv.get(url).catch((err) => {
    reportError(err);
  });

  return data;
};

/**
 * Make location API request to mealviewer
 * @param {object} query - Location query object passed from front end. Destructured out into location query term
 * @returns {object} JSON payload containing information for all locations matching the query term
 */
const requestLocationData = async ({ location }) => {
  const url = `/physicalLocation/search/${location}`;
  const { data } = await mv.get(url).catch((err) => {
    reportError(err);
  });

  return data;
};

/**
 * Abridge meal data by culling fields unnecessary to calculating and displaying daily sugar budget adherence
 * @param {object} data - JSON payload received from mealviewer API request for menu information
 * @returns {object} JSON payload containing abridged meal data containing only nutrition and date information
 */
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
      // Iterating over static menu items that don't change on a daily basis (milk, condiments)
      let nutritionData = Object.fromEntries(
        nutritionals.reduce((result, { name, rawValue, value }) => {
          let match = name.match(unitRgx);
          let nValue = rawValue !== null ? value : null;
          result.push([
            match ? match[1] : name,
            { value: nValue, units: match ? match[2] : null },
          ]);
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
    // Iterating over rotating menu items that change on a daily basis
    let schedule = { date: menuSchedule.dateInformation, meals: [] };
    for (const { blockName, cafeteriaLineList } of menuSchedule.menuBlocks) {
      let items = extractNutritionData(
        cafeteriaLineList.data[0].foodItemList.data
      );
      const meal = { mealBlock: blockName, items: items };
      schedule.meals.push(meal);
    }
    meals.scheduledMeals.push(schedule);
  }

  return meals;
};

export { requestDailyMenuData, requestLocationData, transformDailyMenuData };

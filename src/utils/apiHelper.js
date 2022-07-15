const requestDailyMenuData = async (school) => {
  if (!school) throw new Error("School name is required.");
  if (typeof school !== "string")
    throw new Error("School name must be a valid string.");
  const querySchool = school.split(" ").join("");
  const parseDate = (date) => {
    return new Date(date).toLocaleDateString().split("/").join("-");
  };
  const queryDate = `${parseDate(Date.now())}/${parseDate(Date.now())}`;

  const url = `/${querySchool}/${queryDate}`;

  const { data } = await mv.get(url).catch((e) => {
    if (e.response) {
      console.log(e.response.data);
      console.log(e.response.status);
      console.log(e.response.headers);
    } else if (e.request) {
      console.log(e.request);
    } else {
      console.log("Error with request: ", e.nessage);
    }
  });

  let meals = {};
  const extractNutritionData = (foodItemData) => {
    let foodItems = [];
    for (const { item_Name, item_Type, nutritionals } of foodItemData) {
      let nutritionData = Object.fromEntries(
        nutritionals.map((n) => [n.name, n.value])
      );
      foodItems.push({
        item_Name: item_Name,
        item_Type: item_Type,
        nutritionals: nutritionData,
      });
    }
    return foodItems;
  };

  for (const dailyMenu of data.dailyMenus) {
    let items = extractNutritionData(dailyMenu.items);
    for (const { blockName } of dailyMenu.blocks) {
      meals[blockName] = [];
      meals[blockName] = [
        ...meals[blockName],
        ...JSON.parse(JSON.stringify(items)),
      ];
    }
  }

  for (const menuSchedule of data.menuSchedules) {
    for (const { blockName, cafeteriaLineList } of menuSchedule.menuBlocks) {
      let items = extractNutritionData(
        cafeteriaLineList.data[0].foodItemList.data
      );
      meals[blockName] = [...meals[blockName], ...items];
    }
  }

  return meals;
};

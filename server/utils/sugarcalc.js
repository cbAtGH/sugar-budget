const estimateSugars = (menu) => {
  // const kFRUIT = "FRUIT";
  // const kMILK = "MILK";
  let sugarTotals = [];
  for (const day of menu.scheduledMeals) {
    const dayTotals = [];
    for (const meal of day.meals) {
      const mealMap = meal.items
        .map((m) => m.nutritionals.Sugars.value)
        .filter((v) => v != null);
      dayTotals.push({
        mealBlock: meal.mealBlock,
        total:
          mealMap.length > 0
            ? mealMap.reduce((sum, cValue) => sum + cValue, 0)
            : null,
      });
    }
    sugarTotals.push({ date: day.date, totals: dayTotals });
  }

  return sugarTotals;
};

export { estimateSugars };

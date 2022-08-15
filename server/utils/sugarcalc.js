const estimateSugars = (menu) => {
  // TODO: Capture values for milk, intrinsic and free sugars. Current assumption is milk doesn't count and is ignored.
  const sugarsData = { location: menu.location, sugarTotals: [] };
  for (const day of menu.scheduledMeals) {
    const dayTotals = [];
    for (const meal of day.meals) {
      // Create map of sugar values for each meal item, assuming one entree and one possible side per meal
      const mealSet = new Set();
      const mealMap = meal.items
        .map((m) => {
          if (!mealSet.has(m.itemType)) {
            mealSet.add(m.itemType);
            if (
              m.itemType !== "FRUIT" &&
              m.itemType !== "VEGETABLES" &&
              m.itemType !== "FRUITS"
            ) {
              if ("Sugars" in m.nutritionals)
                return m.nutritionals.Sugars.value;
            }
          }
          return 0;
        })
        .filter((v) => v != null);
      // Aggregate values for sugar value map
      dayTotals.push({
        mealBlock: meal.mealBlock,
        total:
          mealMap.length > 0
            ? mealMap.reduce((sum, cValue) => sum + cValue, 0)
            : null,
      });
    }
    sugarsData.sugarTotals.push({ date: day.date, totals: dayTotals });
  }

  return sugarsData;
};

export { estimateSugars };

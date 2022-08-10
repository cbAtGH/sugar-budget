const estimateSugars = (menu) => {
  const sugarsData = { location: menu.location, sugarTotals: [] };
  for (const day of menu.scheduledMeals) {
    const dayTotals = [];
    for (const meal of day.meals) {
      const mealMap = meal.items
        .map((m) =>
          "Sugars" in m.nutritionals ? m.nutritionals.Sugars.value : 0
        )
        .filter((v) => v != null);
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

const SUGAR_BUDGET_BASELINE = 7;
const DEVIATION_OFFSET = 3;
const ACCEPTED_RANGE = SUGAR_BUDGET_BASELINE + DEVIATION_OFFSET;
class MealString {
  static Breakfast = new MealString("breakfast");
  static Lunch = new MealString("lunch");
  constructor(name) {
    this.name = name;
    Object.freeze(this);
  }
}

class ReportDatum {
  constructor(passed = 0, borderline = 0, failed = 0) {
    this.passed = passed;
    this.borderline = borderline;
    this.failed = failed;
  }
}

const reportHelper = (data, mealStrings) => {
  const reportData = {};
  for (const mealName of mealStrings) reportData[mealName] = new ReportDatum();
  if (data == null || Object.keys(data).length === 0) return reportData;
  for (const day of data.sugarTotals) {
    if (day.totals.length > 0) {
      const selectedMeals = day.totals.map((e) => {
        const meal = e.mealBlock
          .toLowerCase()
          .split(" ")
          .filter((word) => mealStrings.includes(word))[0];
        return { meal: meal, total: e.total };
      });
      let mealSet = new Set();
      for (const meal of selectedMeals) {
        let total;
        if (!mealSet.has(meal.meal)) {
          mealSet.add(meal.meal);
          total = meal ? meal.total : null;
          if (total == null) continue;
          if (total <= SUGAR_BUDGET_BASELINE) reportData[meal.meal].passed += 1;
          if (total <= ACCEPTED_RANGE) reportData[meal.meal].borderline += 1;
          if (total > ACCEPTED_RANGE) reportData[meal.meal].failed += 1;
        }
      }
    }
  }
  return reportData;
};

const generateTotalReport = (menuData) => {
  const totals = new ReportDatum();
  const reportData = reportHelper(menuData, [
    MealString.Breakfast.name,
    MealString.Lunch.name,
  ]);
  for (const meal in reportData) {
    for (const sum in reportData[meal]) {
      totals[sum] += reportData[meal][sum];
    }
  }
  return reportData ? { ...reportData, totals: totals } : {};
};

export { generateTotalReport, MealString };

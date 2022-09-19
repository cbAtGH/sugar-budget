import { DateTime } from "luxon";

export const newDateFromArbitrary = (date, days) => {
  return date.plus({ days }).toJSDate();
};

export const newDateString = (days) => {
  return DateTime.now().plus({ days }).toISO();
};

export const parseISODate = (str) => {
  return DateTime.fromISO(str);
};

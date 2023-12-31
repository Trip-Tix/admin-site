import { Day } from "@public/common/context";

const daysSince1970 = (date: Day): number => {
  const { day, month, year } = date;

  // Calculate the number of days in each month
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year and update days in February
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    daysInMonth[1] = 29;
  }

  // Calculate days from year 1970 to the given year
  let daysSince1970 = (year - 1970) * 365;

  // Add extra day for each leap year
  for (let y = 1970; y < year; y++) {
    if (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) {
      daysSince1970++;
    }
  }

  // Calculate days from months in the given year
  for (let m = 0; m < month - 1; m++) {
    daysSince1970 += daysInMonth[m];
  }

  // Add days of the current month
  daysSince1970 += day;

  return daysSince1970;
};

export const getDaysInRange = (startingDate: Day, endingDate: Day): Day[] => {
  const daysInRange: Day[] = [];

  const startTimestamp = daysSince1970(startingDate);
  const endTimestamp = daysSince1970(endingDate);

  let currentDate = { ...startingDate };

  for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp++) {
    daysInRange.push({ ...currentDate });

    currentDate.day++;
    if (currentDate.day > 31 && currentDate.month === 12) {
      currentDate.day = 1;
      currentDate.month = 1;
      currentDate.year++;
    } else if (currentDate.day > 28 && currentDate.month === 2) {
      currentDate.day = 1;
      currentDate.month++;
    } else if (
      currentDate.day > 30 &&
      (currentDate.month === 4 ||
        currentDate.month === 6 ||
        currentDate.month === 9 ||
        currentDate.month === 11)
    ) {
      currentDate.day = 1;
      currentDate.month++;
    } else if (currentDate.day > 31) {
      currentDate.day = 1;
      currentDate.month++;
    }
  }
  return daysInRange;
};

export function formatDate(day: Day): string {
  const { day: d, month: m, year: y } = day;

  const formattedDay = d.toString().padStart(2, "0");
  const formattedMonth = m.toString().padStart(2, "0");
  const formattedYear = y.toString();

  return `${formattedDay}-${formattedMonth}-${formattedYear}`;
}

export const convertTo12HourFormat = (time24: string): string => {
  const [hour, minute] = time24.split(":").map(Number);

  let period = "AM";
  let formattedHour = hour;

  if (hour >= 12) {
    period = "PM";
    formattedHour = hour === 12 ? 12 : hour - 12;
  }

  if (formattedHour === 0) {
    formattedHour = 12;
  }

  const formattedTime = `${formattedHour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${period}`;

  return formattedTime;
};

export const convertTo24HourFormat = (time12: string): string => {
  const [time, modifier] = time12.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    let hourNum = parseInt(hours, 10) + 12;
    hours = hourNum.toString();
  } else {
    hours = hours.padStart(2, "0");
  }

  return `${hours}:${minutes}`;
};

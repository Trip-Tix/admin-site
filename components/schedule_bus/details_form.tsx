import { useContext, useEffect, useState } from "react";
import { SchedulingContext, Day } from "@public/common/temporary_context";
import PerDate from "@components/schedule_bus/per_date"

interface DetailsFormProps {
  isInitialForm: boolean;
}

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

const getDaysInRange = (startingDate: Day, endingDate: Day): Day[] => {
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

export default function DetailsForm({ isInitialForm }: DetailsFormProps) {
  const { startingLocation, destinations, startingDate, endingDate } =
    useContext(SchedulingContext);

  const [daysInRange, setDaysInRange] = useState<Day[]>([]);

  useEffect(() => {
    if (startingDate && endingDate && !isInitialForm) {
      setDaysInRange(getDaysInRange(startingDate, endingDate));
    }
  }, [isInitialForm]);

  return (
    <>
      {!isInitialForm && (
        <>
          {daysInRange.map((day) => (
            <PerDate key={day.day.toString()+day.month.toString()+day.year.toString()} currentDate={day} />
          ))}
        </>
      )}
    </>
  );
}

import { useContext, useEffect, useState } from "react";
import { SchedulingContext, Day } from "@public/common/temporary_context";

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
}

export default function DetailsForm({ isInitialForm }: DetailsFormProps) {
  const generateDateList = (startDate: Day, endDate: Day): Day[] => {
    const dateList: Day[] = [];
    let currentDate = { ...startDate };
    while (currentDate.day !== endDate.day) {
      dateList.push(currentDate);
      currentDate = {
        day: currentDate.day + 1,
        month: currentDate.month,
        year: currentDate.year,
      };
    }
    dateList.push(currentDate);

    return dateList;
  };

  const { startingLocation, destinations, startingDate, endingDate } =
    useContext(SchedulingContext);

  const [daysInRange, setDaysInRange] = useState<Day[]>(
    []
  );

  useEffect(() => {
    if (startingDate && endingDate) {
      setDaysInRange(generateDateList(startingDate, endingDate));
    }
    console.log(daysInRange);
  }, [isInitialForm]);

  return (
    <>
      {isInitialForm ? (
        <p>Hi</p>
      ) : (
        <>
          {daysInRange.map((day) => (
            <p key={day.day + day.month + day.year} >{day.day} {day.month} {day.year}</p>
          ))}
        </>
      )}
    </>
  );
}

import { useContext, useState } from "react";
import { SchedulingContext, Day } from "@public/common/temporary_context";

interface DetailsFormProps {
  isInitialForm: boolean;
}

export default function DetailsForm({ isInitialForm }: DetailsFormProps) {
  const generateDateList = (startDate: Day, endDate: Day): Day[] => {
    const dateList: Day[] = [];

    const currentDate = { ...startDate };

    while (
      currentDate.day !== endDate.day ||
      currentDate.month !== endDate.month ||
      currentDate.year !== endDate.year
    ) {
      dateList.push({ ...currentDate });
      if (currentDate.day == 28 && currentDate.month == 2) {
        currentDate.day = 1;
        currentDate.month++;
      } else if (
        (currentDate.day === 30 &&
          (currentDate.month === 4 ||
            currentDate.month === 6 ||
            currentDate.month === 9 ||
            currentDate.month === 11)) ||
        (currentDate.day === 31 &&
          (currentDate.month === 1 ||
            currentDate.month === 3 ||
            currentDate.month === 5 ||
            currentDate.month === 7 ||
            currentDate.month === 8 ||
            currentDate.month === 10))
      ) {
        currentDate.day = 1;
        currentDate.month++;
      } else {
        currentDate.day++;
      }
    }

    return dateList;
  };

  const { startingLocation, destinations, startingDate, endingDate } =
    useContext(SchedulingContext);

  const [daysInRange, setDaysInRange] = useState<Day[]>(
    generateDateList(startingDate, endingDate),
  );

  return (
    <>
      {isInitialForm ? (
        <p>Hi</p>
      ) : (
        <>
          {daysInRange.map((day) => (
            <p>{day.day}</p>
          ))}
        </>
      )}
    </>
  );
}

import { useContext, useEffect, useState } from "react";
import { SchedulingContext, Day } from "@public/common/temporary_context";
import PerDate from "@components/schedule_bus/per_date"
import { getDaysInRange } from "@public/common/date_util";

interface DetailsFormProps {
  isInitialForm: boolean;
}

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

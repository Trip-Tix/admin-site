import { useContext, useEffect, useState } from "react";
import { SchedulingContext, Day } from "@public/common/context";
import PerDate from "@components/schedule_bus/per_date"
import { getDaysInRange } from "@public/common/date_util";
import { Button } from "@chakra-ui/react";

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

  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {!isInitialForm && (
        <>
          {daysInRange.map((day) => (
            <PerDate key={day.day.toString()+day.month.toString()+day.year.toString()} currentDate={day} submitted={submitted}/>
          ))}
          <Button onClick={() => setSubmitted(true)} m={2}>Fix Schedule</Button>
        </>
      )}
    </>
  );
}

import { useContext, useEffect, useState } from "react";
import { TrainSchedulingContext, Day } from "@public/common/context";
import PerDate from "@components/schedule_train/per_date"
import { getDaysInRange } from "@public/common/date_util";
import { Button } from "@chakra-ui/react";

interface DetailsFormProps {
  isInitialForm: boolean;
}

export default function DetailsForm({ isInitialForm }: DetailsFormProps) {
  const { startingLocation, destinations, startingDate, endingDate } =
    useContext(TrainSchedulingContext);

  const [daysInRange, setDaysInRange] = useState<Day[]>([]);
  useEffect(() => {
    if (startingDate && endingDate && !isInitialForm) {
      setDaysInRange(getDaysInRange(startingDate, endingDate));
    }
  }, [isInitialForm]);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {!isInitialForm && (
        <>
          {daysInRange.map((day) => (
            <PerDate key={day.day.toString()+day.month.toString()+day.year.toString()} currentDate={day} submitted={submitted}/>
          ))}
          <Button 
            onClick={() => {
              setIsLoading(true); 
              setSubmitted(true);
            }}
            m={2}
            isLoading={isLoading}
          >
            Fix Schedule
          </Button>
        </>
      )}
    </>
  );
}

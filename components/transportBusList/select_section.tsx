import React from "react";
import { HStack } from "@chakra-ui/react";
import SelectOption from "@components/transportBusList/select_option";

interface Props {
  addCoach: (value: string) => void;
  coaches: string[];
  addSource: (value: string) => void;
  sources: string[];
  addDestination: (value: string) => void;
  destinations: string[];
  addArrivalTime: (value: string) => void;
  arrivalTimes: string[];
  addDepartureTime: (value: string) => void;
  departureTimes: string[];
}

export function Select_section({
  addCoach,
  coaches,
  addSource,
  sources,
  addDestination,
  destinations,
  addArrivalTime,
  arrivalTimes,
  addDepartureTime,
  departureTimes,
}: Props) {
  return (
    <HStack spacing={"4"}>
      <SelectOption addAction={addCoach} List={coaches} Name={"Coach"} />
      <SelectOption addAction={addSource} List={sources} Name={"Source"} />
      <SelectOption
        addAction={addDestination}
        List={destinations}
        Name={"Destination"}
      />
      <SelectOption
        addAction={addArrivalTime}
        List={arrivalTimes}
        Name={"Arrival Time"}
      />
      <SelectOption
        addAction={addDepartureTime}
        List={departureTimes}
        Name={"Departure Time"}
      />
    </HStack>
  );
}

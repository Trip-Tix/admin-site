import List from "@components/list_flight/list";
import { FlightInfoContext } from "@public/common/context";
import { HStack } from "@chakra-ui/react";
import { class_interface } from "@public/common/flight_interfaces";
import { useState } from "react";

export default function MainData() {
  const [uniqueFlightId, setUniqueFlightId] = useState<string>("0");
  const [classNames, setClassNames] = useState<string[]>([""]);
  const [classIds, setClassIds] = useState<number[]>([0]);
  const [layout, setLayout] = useState<number[][][]>([]);
  const [numSeat, setNumSeat] = useState<number[]>([0]);
  const [flightLayoutId, setFlightLayoutId] = useState<number[]>([0]);
  const [numTotalSeats, setNumTotalSeats] = useState<number>(0);
  const [facilities, setFacilities] = useState<string[]>([""]);
  
  
  return (
    <FlightInfoContext.Provider value={{ 
      uniqueFlightId, setUniqueFlightId,
      classNames, setClassNames,
      classIds, setClassIds,
      layout, setLayout,
      numSeat, setNumSeat,
      flightLayoutId, setFlightLayoutId,
      numTotalSeats, setNumTotalSeats,
      facilities, setFacilities,
    }}>
      <HStack spacing="4" align="stretch">
        <List />
        {/* <Details /> */}
      </HStack>
    </FlightInfoContext.Provider>
  );
}

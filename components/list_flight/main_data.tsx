import List from "@components/list_flight/list";
import Details from "@components/list_flight/details";
import { FlightInfoContext } from "@public/common/context";
import { HStack } from "@chakra-ui/react";

import { useState } from "react";

export default function MainData() {
  const [flightId, setFlightId] = useState<string>("");
  const [classId, setClassId] = useState<string>("");

  return (
    <FlightInfoContext.Provider value={{ flightId, setFlightId, classId, setClassId }}>
      <HStack spacing="4" align="stretch">
        <List />
        <Details />
      </HStack>
    </FlightInfoContext.Provider>
  );
}

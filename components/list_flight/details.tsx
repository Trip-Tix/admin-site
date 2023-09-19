import { VStack, Heading, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FlightInfoContext } from "@public/common/context";

import Layout from "@components/list_flight/layout";
import InfoTag from "@components/list_flight/info_tag";

export default function Details() {
  const {
    uniqueFlightId,
    classIds,
    classNames,
    layout,
    numSeat,
    flightLayoutId,
    numTotalSeats,
    facilities,
  } = useContext(FlightInfoContext);

  const [selectedClassIndex, setSelectedClassIndex] = useState<number | null>(null);
  
  const facilitiesString = facilities.join(", ");

  return (
    <VStack spacing={4} align="stretch" width={{ base: "0%", md: "30%" }} visibility={{ base: "hidden", md: "visible" }}>
      <Heading as="h1" size="lg" color="primary.800">
        Details
      </Heading>
      <InfoTag info={uniqueFlightId} label="Unique Flight ID" />
      <InfoTag info={numTotalSeats.toString()} label="Total Seats" />
      <InfoTag info={facilitiesString} label="Facilities" />
      {classNames.map((className, index) => (
        <VStack key={index} align="stretch">
          <Button onClick={() => setSelectedClassIndex(index)}>
            {className}
          </Button>
          {selectedClassIndex === index && layout[index] && (
            <>
              <InfoTag info={flightLayoutId[index].toString()} label="Layout ID" />
              <Layout layout={layout[index]} />
              <InfoTag info={numSeat[index].toString()} label="Number of Seats" />
            </>
          )}
        </VStack>
      ))}
    </VStack>
  );
}
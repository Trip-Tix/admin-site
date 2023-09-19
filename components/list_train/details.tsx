import { VStack, Heading, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { TrainInfoContext } from "@public/common/context";

import Layout from "@components/list_train/layout";
import InfoTag from "@components/list_train/info_tag";

export default function Details() {
  const {
    uniqueTrainId,
    coachIds,
    coachNames,
    layout,
    numSeat,
    trainLayoutId,
    facilities,
  } = useContext(TrainInfoContext);

  const [selectedCoachIndex, setSelectedCoachIndex] = useState<number | null>(null);
  
  const facilitiesString = facilities.join(", ");

  return (
    <VStack spacing={4} align="stretch" width={{ base: "0%", md: "30%" }} visibility={{ base: "hidden", md: "visible" }}>
      <Heading as="h1" size="lg" color="primary.800">
        Details
      </Heading>
      <InfoTag info={uniqueTrainId} label="Unique Train ID" />
      <InfoTag info={facilitiesString} label="Facilities" />
      {coachNames.map((coachName, index) => (
        <VStack key={index} align="stretch">
          <Button onClick={() => setSelectedCoachIndex(index)}>
            {coachName}
          </Button>
          {selectedCoachIndex === index && layout[index] && (
            <>
              <InfoTag info={trainLayoutId[index].toString()} label="Layout ID" />
              <Layout layout={layout[index]} />
              <InfoTag info={numSeat[index].toString()} label="Number of Seats" />
            </>
          )}
        </VStack>
      ))}
    </VStack>
  );
}
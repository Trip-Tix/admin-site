import { VStack, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { BusInfoContext } from "@public/common/context";

import Layout from "@components/list_bus/layout";
import InfoTag from "@components/list_bus/info_tag";
import UniqueBusList from "@components/list_bus/unique_bus_list";


export default function Details() {
  const { coachId, coachName, brandName, layout, numSeat, busLayoutId, numBus } = useContext(BusInfoContext);
  return (
    <VStack
      spacing={4}
      align="stretch"
      width={{ base: "0%", md: "30%" }}
      visibility={{ base: "hidden", md: "visible" }}
    >
      <Heading as="h1" size="lg" color="primary.800">
        Details
      </Heading>
      <InfoTag info={coachId.toString()} label="Coach ID" />
      <InfoTag info={coachName} label="Coach Name" />
      <InfoTag info={brandName} label="Brand Name" />
      <InfoTag info={numBus.toString()} label="Number of Buses" />
      <InfoTag info={numSeat.toString()} label="Number of Seats" />
      <InfoTag info={busLayoutId.toString()} label="Layout ID" />
      <Layout layout={layout} />
      <UniqueBusList coachId={coachId} brandName={brandName}/>
    </VStack>
  );
}

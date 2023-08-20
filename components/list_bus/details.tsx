import { VStack, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { BusInfoContext } from "@public/common/context";

import RouteList from "@components/list_bus/route_list";
import Layout from "@components/list_bus/layout";
import CoachType from "@components/list_bus/coach_type";
import BusId from "@components/list_bus/bus_id";

export default function Details() {
  const { busId, coachId } = useContext(BusInfoContext);

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
      <BusId busId={busId} />
      <CoachType coachId={coachId} />
      <Layout busId={busId} coachId={coachId} />
      <RouteList />
    </VStack>
  );
}

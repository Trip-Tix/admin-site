import { VStack, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { FlightInfoContext } from "@public/common/context";

import RouteList from "@components/list_flight/route_list";
import Layout from "@components/list_flight/layout";
// import ClassType from "@components/class_type";
// import FlightId from "@components/list_flight/flight_id";

export default function Details() {
  const { flightId, classId } = useContext(FlightInfoContext);

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
      {/* <FlightId flightId={flightId} /> */}
      {/* <ClassType classId={classId} /> */}
      <Layout flightId={flightId} flightClassId={classId} />
      <RouteList flightId={flightId} classId={classId} />
    </VStack>
  );
}

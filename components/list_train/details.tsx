import { VStack, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { TrainInfoContext } from "@public/common/context";

import RouteList from "@components/list_train/route_list";
import Layout from "@components/list_train/layout";
// import CoachType from "@components/list_train/coach_type";

import TrainId from "@components/list_train/train_id";

export default function Details() {
  const { trainId, coachId } = useContext(TrainInfoContext);

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
      <TrainId trainId={trainId} />
      {/* <CoachType coachId={coachId} /> */}
      <Layout trainId={trainId} coachId={coachId} />
      <RouteList trainId={trainId} coachId={coachId} />
    </VStack>
  );
}

import { VStack, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { TrainInfoContext } from "@public/common/context";


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
      
    </VStack>
  );
}

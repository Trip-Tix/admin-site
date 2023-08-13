import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import CoachCard from "@components/transportBusAddService/coach_card";

export default function NewCoaches() {
  const [numberOfCoaches, setNumberOfCoaches] = useState(0);
  const [coachList, setCoachList] = useState(["AC", "Seat", "Bus"]);
  return (
    <VStack spacing={"4"} align={"stretch"}>
      {Array.from({ length: numberOfCoaches }, (_, index) => (
        <CoachCard key={index} />
      ))}
      <HStack spacing={"2"}>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<AddIcon />}
          onClick={() => setNumberOfCoaches(numberOfCoaches + 1)}
        />
        <Text colorScheme="teal" color={"teal"}>
          Add New Coach
        </Text>
      </HStack>
    </VStack>
  );
}

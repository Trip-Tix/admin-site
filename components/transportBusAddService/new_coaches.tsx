import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function NewCoaches() {
    const [numberOfCoaches, setNumberOfCoaches] = useState(0);
  return (
    <VStack spacing={"4"} align={"stretch"}>
        {Array.from({ length: numberOfCoaches }, (_, index) => (
          <div key={index}>Coach {index + 1}</div>
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
        <Text colorScheme="teal" color={"teal"}>Add New Coach</Text>
      </HStack>
    </VStack>
  );
}

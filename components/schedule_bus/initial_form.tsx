import { useState, useContext } from "react";
import {
  Flex,
  Text,
  Input,
  VStack,
  Divider,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import { SchedulingContext, Day } from "@public/common/temporary_context";

interface InitialFormProps {
  isInitialForm: boolean;
  setIsInitialForm: (value: boolean) => void;
}

export default function InitialForm({
  isInitialForm,
  setIsInitialForm,
}: InitialFormProps) {
  const {
    startingLocation,
    setStartingLocation,
    destinations,
    setDestinations,
    startingDate,
    setStartingDate,
    endingDate,
    setEndingDate,
  } = useContext(SchedulingContext);

  const handleDestinationChange = (index: number, value: string) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
  };

  const addDestination = () => {
    setDestinations([...destinations, ""]);
  };

  const removeDestination = (index: number) => {
    const updatedDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(updatedDestinations);
  };

  return (
    <>
      <Flex align="center" justify="space-between" direction="row" w="full">
        <Text fontSize="xl" fontWeight="bold" p={2}>
          {" "}
          Starting Location{" "}
        </Text>
        <Text fontSize="xl" fontWeight="bold" p={2}>
          {" "}
          Destinations{" "}
        </Text>
      </Flex>
      <Flex
        align="flex-start"
        justify="space-between"
        direction="row"
        w="full"
        p={2}
        m={2}
      >
        <Input
          value={startingLocation}
          onChange={(e) => setStartingLocation(e.target.value)}
          width={"40%"}
        />

        <Divider orientation="vertical" />

        <VStack spacing={3} align={"right"} w="40%">
          {destinations.map((destination, index) => (
            <InputGroup key={index}>
              <Input
                value={destination}
                onChange={(e) => handleDestinationChange(index, e.target.value)}
                key={index}
                width={"full"}
              />
              <InputRightElement width={"4.5rem"}>
                <Button onClick={() => removeDestination(index)}>Remove</Button>
              </InputRightElement>
            </InputGroup>
          ))}
          <Button onClick={addDestination}>Add Destination</Button>
        </VStack>
      </Flex>
    </>
  );
}

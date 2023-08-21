import {
    Flex,
    Text,
    useColorModeValue,
    HStack,
    Divider,
  } from "@chakra-ui/react";
  
  interface FlightIdProps {
    flightId: string;
  }
  
  export default function FlightId({ flightId }: FlightIdProps) {
    return (
      <Flex
        direction="column"
        align="stretch"
        width={"100%"}
        background={useColorModeValue("gray.100", "gray.700")}
        borderRadius="0.5rem"
        padding={4}
        boxShadow="md"
      >
        <HStack spacing={4} align="stretch" width={"100%"}>
          <Text>Flight ID</Text>
          <Divider orientation="vertical" />
          <Text>{flightId}</Text>
        </HStack>
      </Flex>
    );
  }
  
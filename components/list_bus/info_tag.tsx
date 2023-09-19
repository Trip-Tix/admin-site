import {
    Flex,
    Text,
    useColorModeValue,
    HStack,
    Divider,
  } from "@chakra-ui/react";
  
interface BusIdProps {
    info: string;
    label: string;
}
  
  export default function InfoTag({ info, label }: BusIdProps) {
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
          <Text>{label}</Text>
          <Divider orientation="vertical" />
          <Text>{info}</Text>
        </HStack>
      </Flex>
    );
  }
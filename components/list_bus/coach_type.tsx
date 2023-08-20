import {
  Flex,
  Text,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

interface CoachTypeProps {
  coachId: string;
}

export default function CoachType({ coachId }: CoachTypeProps) {
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
        <Text>Coach Type</Text>
        <Divider orientation="vertical" />
        <Text>{coachId}</Text>
      </HStack>
    </Flex>
  );
}

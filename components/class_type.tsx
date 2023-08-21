import {
  Flex,
  Text,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

interface ClassTypeProps {
  className: string;
}

export default function ClassType({ className }: ClassTypeProps) {
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
        <Text>Class Type</Text>
        <Divider orientation="vertical" />
        <Text>{className}</Text>
      </HStack>
    </Flex>
  );
}

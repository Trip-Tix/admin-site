import { Flex, HStack, Text, VStack, Box } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";

import Seat from "@components/seat";

interface LayoutProps {
  layout: number[][];
}

export default function Layout({ layout }: LayoutProps) {
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
      <HStack spacing={4} align="center">
        <Text>Layout</Text>
        <Divider orientation="vertical" />
        <VStack spacing={1}>
          {layout.map((row, rowIndex) => (
            <HStack spacing={1} key={rowIndex}>
              {row.map((item, columnIndex) => (
                <Box
                  key={columnIndex}
                  background={item === 0 ? "white" : "gray.500"}
                  w={2}
                  h={2}
                  borderRadius={2}
                  visibility={item === 0 ? "hidden" : "visible"}
                />
              ))}
            </HStack>
          ))}
        </VStack>
      </HStack>
    </Flex>
  );
}

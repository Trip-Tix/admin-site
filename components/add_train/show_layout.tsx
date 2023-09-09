import {
  Spinner,
  Text,
  VStack,
  HStack,
  Box,
  Divider,
  Flex,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { fetchTrainLayout } from "@public/common/train_api";

interface ShowLayoutProps {
  coachId: number;
}

export default function ShowLayout({ coachId }: ShowLayoutProps) {
  const { colorMode } = useColorMode();
  const [layout, setLayout] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const layoutData = await fetchTrainLayout(coachId);
      setLayout(layoutData.layout);
      setLoading(false);
    };
    fetchData();
  }, [coachId]);

  useEffect(() => {
    console.log(layout);
  }, [layout]);
  return (
    <>
      {loading ? (
        <>
          <Text>Loading... </Text>
          <Spinner />
        </>
      ) : (
        <>
          <HStack justifyContent={"space-between"} w={"100%"} p={"1rem"}>
            <Flex alignItems={"center"}>
              <Text mr={2}>Layout: </Text>
              <VStack>
                {layout.map((row, rowIndex) => (
                  <HStack key={rowIndex}>
                    {row.map((seat, seatIndex) => (
                      <Box
                        key={seatIndex}
                        w="4"
                        h="4"
                        visibility={seat === 0 ? "hidden" : "visible"}
                        bg={colorMode === 'light' ? "gray.400" : "gray.500"}
                        borderRadius={"md"}
                      />
                    ))}
                  </HStack>
                ))}
              </VStack>
            </Flex>
          </HStack>
        </>
      )}
    </>
  );
}

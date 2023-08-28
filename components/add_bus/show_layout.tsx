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
import { fetchBusLayout } from "@public/common/bus_api";

interface ShowLayoutProps {
  coachId: number;
  brandName: string;
}

export default function ShowLayout({ coachId, brandName }: ShowLayoutProps) {
  const { colorMode } = useColorMode();
  const [layout, setLayout] = useState<number[][]>([]);
  const [existingNumber, setExistingNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const brandData = await fetchBusLayout(coachId, brandName);
      setLayout(brandData.layout);
      setExistingNumber(brandData.numBus);
      setLoading(false);
    };
    fetchData();
  }, [coachId, brandName]);

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
            <Text>Existing Number: {existingNumber}</Text>
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

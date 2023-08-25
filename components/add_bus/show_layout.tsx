import {
  Spinner,
  Text,
  VStack,
  HStack,
  Box,
  Divider,
  Flex,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { fetchBusLayout } from "@public/common/server_api";

interface ShowLayoutProps {
  coachId: number;
  brandName: string;
}

export default function ShowLayout({ coachId, brandName }: ShowLayoutProps) {
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

  return (
    <>
      {loading ? (
        <>
          <Text>Loading... </Text>
          <Spinner />
        </>
      ) : (
        <>
          <HStack justifyContent={"space-between"} w={"100%"}  p={"1rem"}>
            <Text>Layout</Text>
            <VStack>
              {layout.map((row, rowIndex) => (
                <HStack key={rowIndex}>
                  {row.map((seat, seatIndex) => (
                    <Box
                      key={seatIndex}
                      w="8"
                      h="8"
                      visibility={
                        layout[rowIndex][seatIndex] === 1 ? "visible" : "hidden"
                      }
                      bg={{ useColorModeValue: "gray.200", dark: "gray.700" }}
                      borderRadius={"md"}
                    />
                  ))}
                </HStack>
              ))}
            </VStack>
          </HStack>
          <HStack justifyContent={"space-between"} w={"100%"} p={"1rem"}>
            <Text>Existing Number:</Text>
            <Text>{existingNumber}</Text>
          </HStack>
        </>
      )}
    </>
  );
}

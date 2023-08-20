import React, { useContext, useState, useEffect } from "react";
import { CoachInfoContext } from "@public/common/context";
import { useColorModeValue } from "@chakra-ui/react";
import { HStack, Box, VStack, Text } from "@chakra-ui/react";

export default function SeatLayout() {
  const { row, column, setLayout } = useContext(CoachInfoContext);
  const [RowArray, setRowArray] = useState<number[]>([]);
  const [ColumnArray, setColumnArray] = useState<number[]>([]);

  useEffect(() => {
    const rowArray = Array.from(Array(row).keys());
    const columnArray = Array.from(Array(column).keys());
    setRowArray(rowArray);
    setColumnArray(columnArray);
    // console.log(rowArray, columnArray);
  }, [row, column]);

  return (
    <VStack spacing={4} align={"stretch"}>
      <Text fontSize={"xl"} fontWeight={"semibold"} align={"right"}>
        Seat Layout
      </Text>

      {RowArray.map((row) => (
        <HStack key={row}>
          {ColumnArray.map((column) => (
            <Box bg={useColorModeValue("gray.500", "gray.500")} p={4} key={column} w={"full"} textAlign={"center"} borderRadius={5} h={"full"} >
              
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

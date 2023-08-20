import React, { useContext, useState, useEffect } from "react";
import { CoachInfoContext } from "@public/common/context";
import { useColorModeValue } from "@chakra-ui/react";
import { HStack, Box, VStack, Text } from "@chakra-ui/react";
import Seat from "@components/add_train/seat";

export default function SeatLayout() {
  const { row, column, layout, setLayout, availableSeat, setAvailableSeat } = useContext(CoachInfoContext);
  const [RowArray, setRowArray] = useState<number[]>([]);
  const [ColumnArray, setColumnArray] = useState<number[]>([]);

  useEffect(() => {
    const rowArray = Array.from(Array(row).keys());
    const columnArray = Array.from(Array(column).keys());
    setRowArray(rowArray);
    setColumnArray(columnArray);
    const middleColumnIndex =
      column === 1 ? 1 :
      Math.floor(column / 2) - (column % 2 === 0 ? 1 : 0);

    const initialLayout = Array.from({ length: row }, (_, rowIndex) =>
      Array.from({ length: column }, (value, columnIndex) =>
        columnIndex === middleColumnIndex ? 0 : 1,
      ),
    );
    setLayout(initialLayout);

    const numberOfAvailableSeats = initialLayout.flat().reduce((count, value) => count + (value === 1 ? 1 : 0), 0);
    setAvailableSeat(numberOfAvailableSeats);
  }, [row, column]);

  return (
    <VStack spacing={4} align={"stretch"}>
      <Text fontSize={"xl"} fontWeight={"semibold"} align={"right"}>
        Seat Layout
      </Text>
      {RowArray.map((row_index) => (
        <HStack key={row_index}>
          {ColumnArray.map((column_index) => (
            <Seat
              key={column_index}
              row_index={row_index}
              column_index={column_index}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

import { useColorModeValue } from "@chakra-ui/react";
import { HStack, Box, VStack, Text } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { ClassInfoContext } from "@public/common/context";

interface SeatProps {
  row_index: number;
  column_index: number;
}

export default function Seat({ row_index, column_index }: SeatProps) {
  const { layout, setLayout, availableSeat, setAvailableSeat } = useContext(ClassInfoContext);
  const handleClick = (row_index, column_index) => {
    const newLayout = layout.map((row, rowIndex) =>
      rowIndex === row_index
        ? row.map((col, colIndex) =>
            colIndex === column_index ? (col === 0 ? 1 : 0) : col,
          )
        : row,
    );
    setLayout(newLayout);

    const numberOfAvailableSeats = newLayout.flat().reduce((count, value) => count + (value === 1 ? 1 : 0), 0);
    setAvailableSeat(numberOfAvailableSeats);
  };

  return (
    <Box
      bg={layout[row_index][column_index] === 0 ? useColorModeValue("gray.300", "gray.700") : useColorModeValue("gray.500", "gray.500")}
      cursor={"pointer"}
      css={layout[row_index][column_index] === 0 ? {
        boxShadow: "inset 0 0 10px 1px rgba(255, 255, 255, 0.2), 0 0 10px 1px rgba(0, 0, 0, 0.2)",
      } : {
        boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.2)", // Inner black shadow
      } }
      p={4}
      w={"full"}
      textAlign={"center"}
      borderRadius={5}
      h={"full"}
      onClick={() => handleClick(row_index, column_index)}
    ></Box>
  );
}

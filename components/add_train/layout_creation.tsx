import {
  HStack,
  Text,
  VStack,
  Flex,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface LayoutCreationProps {
  row: number;
  setRow: (row: number) => void;
  col: number;
  setCol: (col: number) => void;
  layout: number[][];
  setLayout: (layout: number[][]) => void;
  numSeat: number;
  setNumSeat: (numSeat: number) => void;
}

export default function LayoutCreation({
  row,
  setRow,
  col,
  setCol,
  layout,
  setLayout,
  numSeat,
  setNumSeat,
}: LayoutCreationProps) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const tempRowArray = Array.from({ length: row }, (_, i) => i);
    const tempColArray = Array.from({ length: col }, (_, i) => i);

    const tempLayout = tempRowArray.map(() => 
      tempColArray.map((j) => {
        if (col === 1 || col === 2) {
          return 1;
        } else if (col % 2 === 1 && j === Math.floor(col / 2)) {
          return 0;
        } else if (col % 2 === 0 && j === col / 2 - 1) {
          return 0;
        } else {
          return 1;
        }
      })
    );

    setLayout(tempLayout);
  }, [row, col]);

  useEffect(() => {
    const tempNumSeat = layout.flat().filter(seat => seat === 1).length;
    setNumSeat(tempNumSeat);
  }, [layout]);

  return (
    <Flex direction="row" align="top" justify="space-between" mt={2} mb={2}>
      <VStack align={"left"} spacing={4} w="50%" mr={5} ml={"1rem"}>
        <Text>Row</Text>
        <Slider
          focusThumbOnChange={false}
          value={row}
          onChange={(value) => setRow(value)}
          min={1}
          max={50}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px" color={"black"}>
            {row}
          </SliderThumb>
        </Slider>

        <Text>Column</Text>
        <Slider
          focusThumbOnChange={false}
          value={col}
          onChange={(value) => setCol(value)}
          min={1}
          max={10}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px" color={"black"}>
            {col}
          </SliderThumb>
        </Slider>
      </VStack>

      <VStack mr={"1rem"}>
        {layout.map((rowLayout, rowIdx) => (
          <HStack key={rowIdx}>
            {rowLayout.map((seat, colIdx) => (
              <Box
                key={colIdx}
                height={"4vh"}
                width={"4vh"}
                cursor="pointer"
                borderRadius={"md"}
                bg={
                  seat === 1 
                    ? colorMode === 'light' 
                      ? "gray.400" 
                      : "gray.500"
                    : "invisible"
                }
                borderColor={
                  seat === 0 
                    ? colorMode === 'light' 
                      ? "gray.400" 
                      : "gray.500"
                    : "invisible"
                }
                borderWidth={
                  seat === 0 ? "1px" : "invisible"
                }
                onClick={() => {
                  const updatedLayout = layout.map((r, rIdx) => 
                    rIdx !== rowIdx 
                      ? r 
                      : r.map((s, cIdx) => cIdx !== colIdx ? s : (s === 0 ? 1 : 0))
                  );
                  setLayout(updatedLayout);
                }}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </Flex>
  );
}

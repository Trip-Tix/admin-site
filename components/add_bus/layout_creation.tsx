import {
  HStack,
  Input,
  Text,
  VStack,
  Button,
  Flex,
  Box,
  Center,
  NumberInput,
  NumberInputField,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorMode,
} from "@chakra-ui/react";
import { use, useEffect, useState } from "react";

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
  const [rowArray, setRowArray] = useState<number[]>([]);
  const [colArray, setColArray] = useState<number[]>([]);
  useEffect(() => {
    const tempRowArray: number[] = [];
    for (let i = 0; i < row; i++) {
      tempRowArray.push(i);
    }
    setRowArray(tempRowArray);
  }, [row]);

  useEffect(() => {
    const tempColArray: number[] = [];
    for (let i = 0; i < col; i++) {
      tempColArray.push(i);
    }
    setColArray(tempColArray);
  }, [col]);

  useEffect(() => {
    const tempLayout: number[][] = [];

    for (let i = 0; i < row; i++) {
      const tempRow: number[] = [];

      for (let j = 0; j < col; j++) {
        if (col === 1 || col === 2) {
          tempRow.push(1); // For a single column, set all elements to 1
        } else if (col % 2 === 1 && j === Math.floor(col / 2)) {
          // For odd columns, the center column will be floor(col / 2)
          tempRow.push(0);
        } else if (col % 2 === 0 && j === col / 2 - 1) {
          // For even columns, the center column will be col / 2 - 1
          tempRow.push(0);
        } else {
          tempRow.push(1);
        }
      }

      tempLayout.push(tempRow);
    }

    setLayout(tempLayout);
  }, [row, col]);

  useEffect(() => {
    let tempNumSeat = 0;
    layout.forEach((row) => {
      row.forEach((seat) => {
        if (seat === 1) {
          tempNumSeat++;
        }
      });
    });
    setNumSeat(tempNumSeat);
  }, [layout]);

  return (
    <>
      <Flex direction="row" align="top" justify="space-between" mt={2} mb={2}>
        {/* Row and Col */}
        <VStack align={"left"} spacing={4} w="50%" mr={5} ml={"1rem"}>
          <Text>Row</Text>
          <Slider
            focusThumbOnChange={false}
            value={row}
            onChange={(e) => setRow(e)}
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
            onChange={(e) => setCol(e)}
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
        {/* Layout */}
        <VStack mr={"1rem"}>
          {rowArray.map((row) => (
            <HStack key={row}>
              {colArray.map((col) => (
                <Box
                  height={"4vh"}
                  width={"4vh"}
                  key={col}
                  cursor={"pointer"}
                  borderRadius={"md"}
                  bg={layout[row][col] === 0 ? "invisible" : colorMode === 'light' ? "gray.400" : "gray.500"}
                  borderColor={layout[row][col] === 0 ? colorMode === 'light' ? "gray.400" : "gray.500" : "invisible"}
                  borderWidth={layout[row][col] === 0 ? "1px" : "invisible"}
                  onClick={() => {
                    const tempLayout = JSON.parse(JSON.stringify(layout)); //deep copy
                    tempLayout[row][col] = tempLayout[row][col] === 0 ? 1 : 0;
                    setLayout(tempLayout);
                  }}
                />
              ))}
            </HStack>
          ))}
        </VStack>
      </Flex>
    </>
  );
}

import React, { useContext } from 'react';
import { useColorModeValue } from "@chakra-ui/react";
import { ClassInfoContext } from "@public/common/context";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  Text
} from "@chakra-ui/react";

export default function SelectRow() {
  const { row, setRow } = useContext(ClassInfoContext);
  const handleChange = (value: number | string) => {
    if (typeof value === "string") {
      setRow(parseInt(value));
    } else {
      setRow(value);
    }
  };

  return (
    <HStack spacing="24px">
      <Text fontSize="xl">Row: </Text>
      <NumberInput value={row} onChange={handleChange} min={1} max={50}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider focusThumbOnChange={false} value={row} onChange={handleChange} min={1} max={50}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={row} color={useColorModeValue("gray.500", "gray.500")} />
      </Slider>
    </HStack>
  );
}

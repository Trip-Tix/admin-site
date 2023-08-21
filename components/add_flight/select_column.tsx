import { useContext } from "react";
import { ClassInfoContext } from "@public/common/context";
import { useColorModeValue } from "@chakra-ui/react";
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
  Text,
} from "@chakra-ui/react";

export default function SelectColumn() {
  const { column, setColumn } = useContext(ClassInfoContext);
  const handleChange = (value: number | string) => {
    if (typeof value === "string") {
      setColumn(parseInt(value));
    } else {
      setColumn(value);
    }
  };

  return (
    <HStack spacing="24px">
      <Text fontSize="xl">Column: </Text>
      <NumberInput value={column} onChange={handleChange} min={1} max={10}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        focusThumbOnChange={false}
        value={column}
        onChange={handleChange}
        min={1}
        max={10}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={column} color={useColorModeValue("gray.500", "gray.500")} />
      </Slider>
    </HStack>
  );
}

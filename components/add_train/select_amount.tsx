import { useContext } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { CoachInfoContext } from "@public/common/context";
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

export default function SelectAmount() {
  const { availableNumber, setAvailableNumber } = useContext(CoachInfoContext);
  const handleChange = (value: number | string) => {
    if (typeof value === "string") {
      setAvailableNumber(parseInt(value));
    } else {
      setAvailableNumber(value);
    }
  };

  return (
    <HStack spacing="24px">
      <Text fontSize="xl">Amount: </Text>
      <NumberInput
        value={availableNumber}
        onChange={handleChange}
        min={1}
        max={50}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        focusThumbOnChange={false}
        value={availableNumber}
        onChange={handleChange}
        min={1}
        max={50}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={availableNumber} color={useColorModeValue("gray.500", "gray.500")} />
      </Slider>
    </HStack>
  );
}

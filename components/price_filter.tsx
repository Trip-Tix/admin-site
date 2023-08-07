import React, { useState } from "react";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";

interface ChakraSliderProps {
  min: number;
  max: number;
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const ChakraSlider: React.FC<ChakraSliderProps> = ({
  min,
  max,
  setSelectedMaxPrice,
}) => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Slider
        min={min}
        max={max}
        step={0.01}
        onChange={(value) => {
          setValue(value), setSelectedMaxPrice(value);
        }}
        aria-label="Price Range Slider"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Text mt={2}>
        Price Range: ${min} - ${value === 0 ? max : value}
      </Text>
    </div>
  );
};

export default ChakraSlider;

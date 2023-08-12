import React from "react";
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  SliderMark,
} from "@chakra-ui/react";
import { accent } from "@public/commonData/Colors";

interface Props {
  maxFare: number;
  setSliderValue: (value: number) => void;
  sliderValue: number;
}

export function Money_slider({
  maxFare,
  setSliderValue,
  sliderValue,
}: Props) {

  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Box pt={6} pb={2} w={"50%"}>
      <Slider
        id="slider"
        defaultValue={maxFare}
        min={0}
        max={maxFare}
        colorScheme={"red"}
        onChange={(v) => setSliderValue(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
          0$
        </SliderMark>
        <SliderMark value={maxFare} mt="1" ml="-2.5" fontSize="sm">
          {maxFare}$
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg={accent}
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={`${sliderValue}$`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Box>
  );
}

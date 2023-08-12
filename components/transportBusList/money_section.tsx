import React from "react";
import { Center, Flex, Heading } from "@chakra-ui/react";

import { Money_slider } from "@components/transportBusList/money_slider";

interface Props {
  maxFare: number;
  setSliderValue: (value: number) => void;
  sliderValue: number;
}

export function Money_section({ maxFare, setSliderValue, sliderValue }: Props) {
  return (
    <Flex direction={"column"}>
      <Center>
        <Heading marginTop={"4"} fontSize={"sm"}>
          Money
        </Heading>
      </Center>
      <Center>
        <Money_slider
          maxFare={maxFare}
          setSliderValue={setSliderValue}
          sliderValue={sliderValue}
        />
      </Center>
    </Flex>
  );
}

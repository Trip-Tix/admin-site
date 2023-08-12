import React from "react";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { darkerBackground, lightForeground } from "@public/commonData/Colors";
import { motion } from "framer-motion";
import { Filter_button } from "./filter_button";
import { Close_button } from "./close_button";
import { Money_section } from "./money_section";
import { Select_section } from "./select_section";
import { Tag_section } from "./tag_section";

interface Props {
  filterVisible: boolean;
  loading: boolean;
  setFilterVisible: (value: boolean) => void;
  reset: () => void;
  selectedCoach: string[];
  removeCoach: (value: string) => void;
  selectedSource: string[];
  removeSource: (value: string) => void;
  selectedDestination: string[];
  removeDestination: (value: string) => void;
  selectedArrivalTime: string[];
  removeArrivalTime: (value: string) => void;
  selectedDepartureTime: string[];
  removeDepartureTime: (value: string) => void;
  addCoach: (value: string) => void;
  coaches: string[];
  addSource: (value: string) => void;
  sources: string[];
  addDestination: (value: string) => void;
  destinations: string[];
  addArrivalTime: (value: string) => void;
  arrivalTimes: string[];
  addDepartureTime: (value: string) => void;
  departureTimes: string[];
  maxFare: number;
  setSliderValue: (value: number) => void;
  sliderValue: number;
}

export function Render_filter({
  filterVisible,
  loading,
  setFilterVisible,
  reset,
  selectedCoach,
  removeCoach,
  selectedSource,
  removeSource,
  selectedDestination,
  removeDestination,
  selectedArrivalTime,
  removeArrivalTime,
  selectedDepartureTime,
  removeDepartureTime,
  addCoach,
  coaches,
  addSource,
  sources,
  addDestination,
  destinations,
  addArrivalTime,
  arrivalTimes,
  addDepartureTime,
  departureTimes,
  maxFare,
  setSliderValue,
  sliderValue,
}: Props) {
  return (
    <Flex direction={"column"} width={"90vw"}>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }}
        animate={{
          opacity: 1,
          height: !filterVisible ? "auto" : 0,
          overflow: "hidden",
        }}
        exit={{
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }} // Exit animation properties
        transition={{
          duration: 0.3,
        }}
      >
        <Filter_button loading={loading} setFilterVisible={setFilterVisible} />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }}
        animate={{
          opacity: 1,
          height: filterVisible ? "auto" : 0,
          overflow: "hidden",
        }}
        exit={{
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }} 
        transition={{
          duration: 0.3,
        }}
      >
        <Box dropShadow={"md"} rounded={"10px"} bgColor={darkerBackground}>
          <Flex direction={"column"} padding={"4"}>
            <Close_button reset={reset} setFilterVisible={setFilterVisible} />
            <Tag_section
              selectedCoach={selectedCoach}
              removeCoach={removeCoach}
              selectedSource={selectedSource}
              removeSource={removeSource}
              selectedDestination={selectedDestination}
              removeDestination={removeDestination}
              selectedArrivalTime={selectedArrivalTime}
              removeArrivalTime={removeArrivalTime}
              selectedDepartureTime={selectedDepartureTime}
              removeDepartureTime={removeDepartureTime}
            />
            <Heading margin={"4"}>Filter</Heading>
            <Select_section
              addCoach={addCoach}
              coaches={coaches}
              addSource={addSource}
              sources={sources}
              addDestination={addDestination}
              destinations={destinations}
              addArrivalTime={addArrivalTime}
              arrivalTimes={arrivalTimes}
              addDepartureTime={addDepartureTime}
              departureTimes={departureTimes}
            />
            <Money_section
              maxFare={maxFare}
              setSliderValue={setSliderValue}
              sliderValue={sliderValue}
            />
          </Flex>
        </Box>
      </motion.div>
    </Flex>
  );
}

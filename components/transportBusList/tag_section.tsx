import React from "react";
import { Flex, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import TagList from "@components/transportBusList/tag_list";

interface Props {
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
}

export function Tag_section({
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
}: Props) {
  return (
    <Flex direction={"row"} wrap={"wrap"} padding={"4"}>
      <TagList List={selectedCoach} removeAction={removeCoach} />
      <TagList List={selectedSource} removeAction={removeSource} />
      <TagList List={selectedDestination} removeAction={removeDestination} />
      <TagList List={selectedArrivalTime} removeAction={removeArrivalTime} />
      <TagList
        List={selectedDepartureTime}
        removeAction={removeDepartureTime}
      />
    </Flex>
  );
}

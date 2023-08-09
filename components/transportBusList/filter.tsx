import { useState, useEffect } from "react";
import {
  Flex,
  Grid,
  Box,
  Text,
  Wrap,
  WrapItem,
  Center,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Icon,
  Select,
} from "@chakra-ui/react";

import { TriangleDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  foreground,
  lightForeground,
  background,
  darkerBackground,
  accent,
} from "@public/commonData/Colors";

interface BusSchedule {
  bus_schedule_id: string;
  bus_name: string;
  coach_name: string;
  source: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  bus_fare: number;
  schedule_date: string;
}

interface FilterProps {
  originalTransports: BusSchedule[];
  setFilteredTransports: React.Dispatch<React.SetStateAction<BusSchedule[]>>;
  loading: boolean;
}

export default function Filter({
  originalTransports,
  setFilteredTransports,
  loading,
}: FilterProps) {
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string[]>([]);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState<string[]>([]);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState<string[]>(
    [],
  );
  const [maxFare, setMaxFare] = useState(100);
  const [coaches, setCoaches] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [arrivalTimes, setArrivalTimes] = useState<string[]>([]);
  const [departureTimes, setDepartureTimes] = useState<string[]>([]);

  useEffect(() => {
    const newCoaches = Array.from(
      new Set(originalTransports.flatMap((t) => t.coach_name)),
    );
    const newSources = Array.from(
      new Set(originalTransports.flatMap((t) => t.source)),
    );
    const newDestinations = Array.from(
      new Set(originalTransports.flatMap((t) => t.destination)),
    );
    const newArrivalTimes = Array.from(
      new Set(originalTransports.flatMap((t) => t.arrival_time)),
    );
    const newDepartureTimes = Array.from(
      new Set(originalTransports.flatMap((t) => t.departure_time)),
    );
    const newMaxFare = Math.max(...originalTransports.map((t) => t.bus_fare));

    setCoaches(newCoaches);
    setSources(newSources);
    setDestinations(newDestinations);
    setArrivalTimes(newArrivalTimes);
    setDepartureTimes(newDepartureTimes);
    setMaxFare(newMaxFare);
    setSliderValue(newMaxFare);
  }, [originalTransports]);

  const addCoach = (coach: string) => {
    if (selectedCoach.includes(coach)) return;
    setSelectedCoach([...selectedCoach, coach]);
  };

  const removeCoach = (coach: string) => {
    setSelectedCoach(selectedCoach.filter((c) => c !== coach));
  };

  const addSource = (source: string) => {
    if (selectedSource.includes(source)) return;
    setSelectedSource([...selectedSource, source]);
  };

  const removeSource = (source: string) => {
    setSelectedSource(selectedSource.filter((s) => s !== source));
  };

  const addDestination = (destination: string) => {
    if (selectedDestination.includes(destination)) return;
    setSelectedDestination([...selectedDestination, destination]);
  };

  const removeDestination = (destination: string) => {
    setSelectedDestination(
      selectedDestination.filter((d) => d !== destination),
    );
  };

  const addArrivalTime = (arrivalTime: string) => {
    if (selectedArrivalTime.includes(arrivalTime)) return;
    setSelectedArrivalTime([...selectedArrivalTime, arrivalTime]);
  };

  const removeArrivalTime = (arrivalTime: string) => {
    setSelectedArrivalTime(
      selectedArrivalTime.filter((a) => a !== arrivalTime),
    );
  };

  const addDepartureTime = (departureTime: string) => {
    if (selectedDepartureTime.includes(departureTime)) return;
    setSelectedDepartureTime([...selectedDepartureTime, departureTime]);
  };

  const removeDepartureTime = (departureTime: string) => {
    setSelectedDepartureTime(
      selectedDepartureTime.filter((d) => d !== departureTime),
    );
  };

  useEffect(() => {
    let newFilteredTransports = originalTransports;
    let filterableCoaches = selectedCoach.length == 0 ? coaches : selectedCoach;
    let filterableSources = selectedSource.length == 0 ? sources : selectedSource;
    let filterableDestinations = selectedDestination.length == 0 ? destinations : selectedDestination;
    let filterableArrivalTimes = selectedArrivalTime.length == 0 ? arrivalTimes : selectedArrivalTime;
    let filterableDepartureTimes = selectedDepartureTime.length == 0 ? departureTimes : selectedDepartureTime;

    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableCoaches.includes(t.coach_name),
    );
    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableSources.includes(t.source),
    );
    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableDestinations.includes(t.destination),
    );
    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableArrivalTimes.includes(t.arrival_time),
    );
    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableDepartureTimes.includes(t.departure_time),
    );
    newFilteredTransports = newFilteredTransports.filter(
      (t) => t.bus_fare <= sliderValue,
    );
    
    setFilteredTransports(newFilteredTransports);
  }, [
    selectedCoach,
    selectedSource,
    selectedDestination,
    selectedArrivalTime,
    selectedDepartureTime,
    maxFare,
    sliderValue,
    originalTransports,
    setFilteredTransports,
    coaches,
    sources,
    destinations,
    arrivalTimes,
    departureTimes,
  ]);

  const reset = () => {
    setSelectedCoach([]);
    setSelectedSource([]);
    setSelectedDestination([]);
    setSelectedArrivalTime([]);
    setSelectedDepartureTime([]);
    setSliderValue(maxFare);
  };

  return (
    <Flex direction={"column"} width={"90vw"}>
      {!filterVisible ? (
        <Flex>
          <Flex
            direction={"row"}
            border="1px"
            borderColor={darkerBackground}
            alignItems={"center"}
            rounded={"10"}
            color={lightForeground}
          >
            <Icon
              as={TriangleDownIcon}
              height={"10"}
              width={"10"}
              onClick={() => {
                if (!loading) setFilterVisible(true);
              }}
              cursor={"pointer"}
              marginRight={"4"}
              padding={"1"}
            />
            <Text paddingRight={"2"}>Filter</Text>
          </Flex>
        </Flex>
      ) : null}

      {filterVisible ? (
        <Box dropShadow={"md"} rounded={"10px"} bgColor={darkerBackground}>
          <Flex direction={"column"} padding={"4"}>
            <Flex direction={"row-reverse"} alignItems={"center"}>
              <Icon
                as={CloseIcon}
                marginLeft={"1"}
                marginRight={"2"}
                height={"3"}
                width={"3"}
                onClick={() => {
                  reset();
                  setFilterVisible(false);
                }}
                cursor={"pointer"}
              />
            </Flex>
            <Wrap>
              {selectedCoach.map((coach) => (
                <WrapItem key={coach}>
                  <Center bg="red.200" rounded={"10"} shadow={"md"}>
                    <Flex direction={"row"} alignItems={"center"}>
                      <Text padding={"2"}> {coach} </Text>
                      <Center>
                        <Icon
                          as={CloseIcon}
                          cursor={"pointer"}
                          marginLeft={"1"}
                          marginRight={"2"}
                          height={"3"}
                          width={"3"}
                          onClick={() => removeCoach(coach)}
                        />
                      </Center>
                    </Flex>
                  </Center>
                </WrapItem>
              ))}
              {selectedSource.map((source) => (
                <WrapItem key={source}>
                  <Center bg="red.200" rounded={"10"} shadow={"md"}>
                    <Flex direction={"row"} alignItems={"center"}>
                      <Text padding={"2"}> Source: {source} </Text>
                      <Center>
                        <Icon
                          as={CloseIcon}
                          cursor={"pointer"}
                          marginLeft={"1"}
                          marginRight={"2"}
                          height={"3"}
                          width={"3"}
                          onClick={() => removeSource(source)}
                        />
                      </Center>
                    </Flex>
                  </Center>
                </WrapItem>
              ))}
              {selectedDestination.map((destination) => (
                <WrapItem key={destination}>
                  <Center bg="red.200" rounded={"10"} shadow={"md"}>
                    <Flex direction={"row"} alignItems={"center"}>
                      <Text padding={"2"}> Destination: {destination} </Text>
                      <Center>
                        <Icon
                          as={CloseIcon}
                          cursor={"pointer"}
                          marginLeft={"1"}
                          marginRight={"2"}
                          height={"3"}
                          width={"3"}
                          onClick={() => removeDestination(destination)}
                        />
                      </Center>
                    </Flex>
                  </Center>
                </WrapItem>
              ))}
              {selectedArrivalTime.map((arrivalTime) => (
                <WrapItem key={arrivalTime}>
                  <Center bg="red.200" rounded={"10"} shadow={"md"}>
                    <Flex direction={"row"} alignItems={"center"}>
                      <Text padding={"2"}> Arrival: {arrivalTime} </Text>
                      <Center>
                        <Icon
                          as={CloseIcon}
                          cursor={"pointer"}
                          marginLeft={"1"}
                          marginRight={"2"}
                          height={"3"}
                          width={"3"}
                          onClick={() => removeArrivalTime(arrivalTime)}
                        />
                      </Center>
                    </Flex>
                  </Center>
                </WrapItem>
              ))}
              {selectedDepartureTime.map((departureTime) => (
                <WrapItem key={departureTime}>
                  <Center bg="red.200" rounded={"10"} shadow={"md"}>
                    <Flex direction={"row"} alignItems={"center"}>
                      <Text padding={"2"}> Departure: {departureTime} </Text>
                      <Center>
                        <Icon
                          as={CloseIcon}
                          cursor={"pointer"}
                          marginLeft={"1"}
                          marginRight={"2"}
                          height={"3"}
                          width={"3"}
                          onClick={() => removeDepartureTime(departureTime)}
                        />
                      </Center>
                    </Flex>
                  </Center>
                </WrapItem>
              ))}
            </Wrap>
            <Heading padding={"4"}>Filter</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <Box w="100%" h="10">
                <Center height={"100%"} width={"100%"}>
                  <Select
                    onChange={(event) => addCoach(event.target.value)}
                    value=""
                  >
                    <option value="" disabled>
                      Select Coach
                    </option>
                    {coaches.map((coach) => (
                      <option value={coach} key={coach}>
                        {coach}
                      </option>
                    ))}
                  </Select>
                </Center>
              </Box>
              <Box w="100%" h="10">
                <Center height={"100%"} width={"100%"}>
                  <Select
                    onChange={(event) => addSource(event.target.value)}
                    value=""
                  >
                    <option value="" disabled>
                      Select Source
                    </option>
                    {sources.map((source) => (
                      <option value={source} key={source}>
                        {source}
                      </option>
                    ))}
                  </Select>
                </Center>
              </Box>
              <Box w="100%" h="10">
                <Center height={"100%"} width={"100%"}>
                  <Select
                    onChange={(event) => addDestination(event.target.value)}
                    value=""
                  >
                    <option value="" disabled>
                      Select Destination
                    </option>
                    {destinations.map((destination) => (
                      <option value={destination} key={destination}>
                        {destination}
                      </option>
                    ))}
                  </Select>
                </Center>
              </Box>
              <Box w="100%" h="10">
                <Center height={"100%"} width={"100%"}>
                  <Select
                    onChange={(event) => addArrivalTime(event.target.value)}
                    value=""
                  >
                    <option value="" disabled>
                      Select Arrival Time
                    </option>
                    {arrivalTimes.map((arrivalTime) => (
                      <option value={arrivalTime} key={arrivalTime}>
                        {arrivalTime}
                      </option>
                    ))}
                  </Select>
                </Center>
              </Box>
              <Box w="100%" h="10">
                <Center height={"100%"} width={"100%"}>
                  <Select
                    onChange={(event) => addDepartureTime(event.target.value)}
                    value=""
                  >
                    <option value="" disabled>
                      Select Departure Time
                    </option>
                    {departureTimes.map((departureTime) => (
                      <option value={departureTime} key={departureTime}>
                        {departureTime}
                      </option>
                    ))}
                  </Select>
                </Center>
              </Box>
            </Grid>
            <Center>
              <Heading marginTop={"4"} fontSize={"sm"}>
                Money
              </Heading>
            </Center>
            <Center>
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
            </Center>
          </Flex>
        </Box>
      ) : null}
    </Flex>
  );
}

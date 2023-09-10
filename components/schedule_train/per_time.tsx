import { ScheduleEntry, scheduleTrainReturnType } from "@public/common/train_interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Text,
  Button,
  Flex,
  Input,
  Divider,
  Grid,
  GridItem,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import {
  fetchAllAvailableTrain,
} from "@public/common/train_api";
import { formatDate, convertTo12HourFormat } from "@public/common/date_util";
import { AiOutlineClose } from "react-icons/ai";
import { locationInfo } from "@public/common/train_interfaces";

interface PerTimeProps {
  currentKey: number;
  destinations: locationInfo[];
  scheduleEntries: ScheduleEntry[];
  setScheduleEntries: (value: ScheduleEntry[]) => void;
  removeScheduleEntry: (index: number) => void;
  selectedTrains: scheduleTrainReturnType[];
  setSelectedTrains: (value: scheduleTrainReturnType[]) => void;
}

export default function PerTime({
  currentKey,
  destinations,
  scheduleEntries,
  setScheduleEntries,
  removeScheduleEntry,
  selectedTrains,
  setSelectedTrains,
}: PerTimeProps) {


  //time data
  const [time, setTime] = useState("00:00");
  const [time24, setTime24] = useState("00:00");
  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime24(event.target.value);
    setTime(convertTo12HourFormat(event.target.value));
  };

  //now according to selected date, time fetch all the possible unique train id
  const [uniqueTrainList, setUniqueTrainList] = useState<scheduleTrainReturnType[]>([]);
  const [isUniqueTrainListLoading, setIsUniqueTrainListLoading] = useState(false);

  const [uniqueTrain, setUniqueTrain] = useState<scheduleTrainReturnType>({
    unique_train_id: "",
    coach_info: [],
    coach_names: [],
    number_of_seats: [],
  });

  useEffect(() => {
    if (
      scheduleEntries[currentKey] === null ||
      scheduleEntries[currentKey] === undefined
    )
      return;
    if (time === "00:00") return;
    setIsUniqueTrainListLoading(true);
    fetchAllAvailableTrain(
      scheduleEntries[currentKey].date,
    ).then((data) => {
      console.log(data);
      setUniqueTrainList(data);
      setIsUniqueTrainListLoading(false);
    });
  }, [time, currentKey]);
  
  //fare data
  const [coachFares, setCoachFares] = useState<{ [key: string]: number[] }>({});

  useEffect(() => {
    const initialFares = {};
    uniqueTrain.coach_names.forEach((coachName) => {
      initialFares[coachName] = new Array(destinations.length).fill(0);
    });
    setCoachFares(initialFares);
  }, [destinations, uniqueTrain.coach_names]);

  const convertCoachFaresToArray = (coachFares: { [key: string]: number[] }): number[][] => {
    return Object.values(coachFares);
  };
  
  const [numberOfCoaches, setNumberOfCoaches] = useState<number[]>([]);

  useEffect(() => {
    setNumberOfCoaches(new Array(uniqueTrain.coach_info.length).fill(1));
  }, [uniqueTrain]);

  useEffect(() => {
    console.log(coachFares);
    const updatedFare = convertCoachFaresToArray(coachFares);
    console.log(updatedFare);
  }, [coachFares]);

  //every time you change something, update the schedule entry
  useEffect(() => {
    const updatedFare = convertCoachFaresToArray(coachFares);
    const updatedScheduleEntries = scheduleEntries.map((entry) => {
      if (entry.key === currentKey) {
        return {
          key: currentKey,
          date: entry.date,
          time,
          coachIds: uniqueTrain.coach_info,
          fare: updatedFare,
          numOfCoaches: numberOfCoaches,
          uniqueTrainId: uniqueTrain.unique_train_id,
        };
      } else {
        return entry;
      }
    });
    setScheduleEntries(updatedScheduleEntries);
  }, [coachFares, uniqueTrain.unique_train_id, time, numberOfCoaches]);
  


  return (
    <>
      <Divider />
      <Flex
        direction="row-reverse"
        w="100%"
        m={2}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Button
          onClick={() => removeScheduleEntry(currentKey)}
          colorScheme="red"
        >
          <AiOutlineClose />
        </Button>
        <Text>{`Time Entry ${currentKey}`}</Text>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} w={"100%"}>
        <Flex direction="row" w="full" alignItems={"center"}>
          <Text mr={6}>Time: </Text>
          <Input
            type="time"
            value={time24}
            onChange={handleTimeChange}
            w="full"
            maxW="sm"
          />
        </Flex>
        <Flex direction="row" w="full" alignItems={"center"}>
          <Text mr={6}>Unique Train: </Text>
          {isUniqueTrainListLoading ? (
            <Text>Loading...</Text>
          ) : (
            <select
            onChange={(event) => {
              const selectedUniqueTrain = uniqueTrainList.find(
                (train) => train.unique_train_id === event.target.value
              );
              if (selectedUniqueTrain) {
                setUniqueTrain(selectedUniqueTrain);
                selectedTrains[currentKey] = selectedUniqueTrain;
                setSelectedTrains(selectedTrains);
              }
            }}
            value={uniqueTrain.unique_train_id}
          >
            <option value="">Select Unique Train</option>
            {uniqueTrainList.map((train) => (
              <option 
                key={train.unique_train_id} 
                value={train.unique_train_id}
                disabled={selectedTrains.some(sf => sf.unique_train_id === train.unique_train_id)}
              >
                {train.unique_train_id}
              </option>
            ))}
          </select>
        )}
        </Flex>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} w={"100%"} mt={6} mb={6}>
        {uniqueTrain.coach_names.map((coachName, coachIndex) => (
          <Box key={coachName} mb={4} p={4} boxShadow="md" borderRadius="md">
            <Divider mb={4} />
            <Text mt={4} fontSize="xl" fontWeight="bold">
              {coachName}
            </Text>
            <Flex mt={8} alignItems="center">
              <Text mb={2} fontSize="md" fontWeight="medium">Number of Coaches:</Text>
              <Input 
                ml={4}
                value={numberOfCoaches[coachIndex] || 1} 
                isReadOnly 
                w="40%" 
                maxW="sm" 
                textAlign="center"
              />
            </Flex>
            <Slider
              mt={5}
              width="80%"
              aria-label="slider-ex-1"
              defaultValue={numberOfCoaches[coachIndex] || 1}
              onChange={(value) => {
                const updatedNumberOfCoaches = [...numberOfCoaches];
                updatedNumberOfCoaches[coachIndex] = value;
                setNumberOfCoaches(updatedNumberOfCoaches);
              }}
              min={1}
              max={25} 
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={8}>
                <Box color="tomato" as="span">
                  {numberOfCoaches[coachIndex] || 1}
                </Box>
              </SliderThumb>
            </Slider>
            {/* <Divider mt={4} mb={4} /> */}

            {destinations.map((destination, destinationIndex) => (
              <Flex key={destination.location_id} align="center" mt={4}>
                <Text mr={4} fontSize="md" fontWeight="medium">{destination.station_name}:</Text>
                <Input
                  type="number"
                  value={coachFares[coachName] ? coachFares[coachName][destinationIndex] || "" : ""}
                  onChange={(event) => {
                    const updatedFares = { ...coachFares };
                    if (!updatedFares[coachName]) {
                      updatedFares[coachName] = [];
                    }
                    updatedFares[coachName][destinationIndex] = parseInt(event.target.value);
                    setCoachFares(updatedFares);
                  }}
                  placeholder="Enter fare"
                  w="40%"
                  maxW="sm"
                />
                <Text ml={4} fontSize="md">Tk</Text>
              </Flex>
            ))}

          </Box>
        ))}
      </Grid>
    </>
  );
}

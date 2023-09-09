import { ScheduleEntry, scheduleFlightReturnType } from "@public/common/flight_interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Text,
  Button,
  Flex,
  Input,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  fetchAllAvailableFlight,
} from "@public/common/flight_api";
import { formatDate, convertTo12HourFormat } from "@public/common/date_util";
import { AiOutlineClose } from "react-icons/ai";

interface PerTimeProps {
  currentKey: number;
  scheduleEntries: ScheduleEntry[];
  setScheduleEntries: (value: ScheduleEntry[]) => void;
  removeScheduleEntry: (index: number) => void;
  selectedFlights: scheduleFlightReturnType[];
  setSelectedFlights: (value: scheduleFlightReturnType[]) => void;
}

export default function PerTime({
  currentKey,
  scheduleEntries,
  setScheduleEntries,
  removeScheduleEntry,
  selectedFlights,
  setSelectedFlights
}: PerTimeProps) {


  //time data
  const [time, setTime] = useState("00:00");
  const [time24, setTime24] = useState("00:00");
  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime24(event.target.value);
    setTime(convertTo12HourFormat(event.target.value));
  };

  //now according to selected date, time fetch all the possible unique flight id
  const [uniqueFlightList, setUniqueFlightList] = useState<scheduleFlightReturnType[]>([]);
  const [isUniqueFlightListLoading, setIsUniqueFlightListLoading] = useState(false);

  const [uniqueFlight, setUniqueFlight] = useState<scheduleFlightReturnType>({
    uniqueFlightId: "",
    numberOfSeats: 0,
    classIds: [],
    classNames: [],
  });

  useEffect(() => {
    if (
      scheduleEntries[currentKey] === null ||
      scheduleEntries[currentKey] === undefined
    )
      return;
    if (time === "00:00") return;
    setIsUniqueFlightListLoading(true);
    fetchAllAvailableFlight(
      scheduleEntries[currentKey].date,
    ).then((data) => {
      console.log(data);
      setUniqueFlightList(data);
      setIsUniqueFlightListLoading(false);
    });
  }, [time, currentKey]);
  

  //fare data
  const [fare, setFare] = useState<number[]>([0]);
  useEffect(() => {
    const tempList: number[] = [];
    uniqueFlight.classIds.forEach(() => {
      tempList.push(0);
    });
    setFare(tempList);
  }, [uniqueFlight.classIds.length]);


  //every time you change something, update the schedule entry
  useEffect(() => {
    const updatedScheduleEntries = scheduleEntries.map((entry) => {
      let uniqueFlightId = uniqueFlight.uniqueFlightId;
      if (entry.key === currentKey) {
        return {
          key: currentKey,
          date: entry.date,
          time,
          fare,
          uniqueFlightId,
        };
      } else {
        return entry;
      }
    });
    setScheduleEntries(updatedScheduleEntries);
  }, [fare, uniqueFlight.uniqueFlightId, time]);

  
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
          <Text mr={6}>Unique Flight: </Text>
          {isUniqueFlightListLoading ? (
            <Text>Loading...</Text>
          ) : (
            <select
            onChange={(event) => {
              const selectedUniqueFlight = uniqueFlightList.find(
                (flight) => flight.uniqueFlightId === event.target.value
              );
              if (selectedUniqueFlight) {
                setUniqueFlight(selectedUniqueFlight);
                // Add the selected flight to the selectedFlights array
                setSelectedFlights([...selectedFlights, selectedUniqueFlight]);
              }
            }}
            value={uniqueFlight.uniqueFlightId}
          >
            <option value="">Select Unique Flight</option>
            {uniqueFlightList.map((flight) => (
              <option 
                key={flight.uniqueFlightId} 
                value={flight.uniqueFlightId}
                disabled={selectedFlights.some(sf => sf.uniqueFlightId === flight.uniqueFlightId)}
              >
                {flight.uniqueFlightId}
              </option>
            ))}
          </select>
        )}
        </Flex>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} w={"100%"} mt={6} mb={6}>
        <GridItem colSpan={2}>
          <Text>Fare: </Text>
        </GridItem>
        {fare.map((item, index) => (
          <Flex key={index} direction="row" w="full" alignItems={"center"}>
            <Text mr={6}>{uniqueFlight.classNames[index]}: </Text>
            <Input
              type="number"
              value={item}
              onChange={(event) => {
                const tempFare = [...fare];
                tempFare[index] = parseInt(event.target.value || "0");
                setFare(tempFare);
              }}
              w="full"
              maxW="sm"
            />
            <Text ml={6}>Tk</Text>
          </Flex>
        ))}
      </Grid>
    </>
  );
}

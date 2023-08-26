import { ScheduleEntry } from "@public/common/bus_interfaces";
import { ChangeEvent, useEffect, useState } from "react";  
import { Box, Text, Button, Flex, Input } from "@chakra-ui/react";
import { fetchCoachBrandList } from "@public/common/bus_api";


interface PerTimeProps {
  currentKey: number;
  scheduleEntries: ScheduleEntry[];
  setScheduleEntries: (value: ScheduleEntry[]) => void;
  removeScheduleEntry: (index: number) => void;
}

export default function PerTime({
  currentKey,
  scheduleEntries,
  setScheduleEntries,
  removeScheduleEntry,
}: PerTimeProps) {
  const [time, setTime] = useState("");
  const [fare, setFare] = useState(0);
  const [uniqueBusId, setUniqueBusId] = useState("");


  const [coachList, setCoachList] = useState<string[]>([]);
  useEffect(() => {
    fetchCoachBrandList().then((res) => {
      const coachList = res.map((coach) => coach.coachName);
      setCoachList(coachList);
    });
  }, []);
  const [coach, setCoach] = useState("");
  const handleCoachChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCoach(event.target.value);
  };



  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  const handleFareChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFare(parseInt(event.target.value));
  };

  const handleUniqueBusIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUniqueBusId(event.target.value);
  };

  const updateScheduleEntry = () => {
    const updatedScheduleEntries = scheduleEntries.map((entry) => {
      if (entry.key === currentKey) {
        return {
          key: currentKey,
          date: entry.date,
          time,
          fare,
          uniqueBusId,
        };
      } else {
        return entry;
      }
    });
    setScheduleEntries(updatedScheduleEntries);
  };

  return (
    <Box>
      <Flex justify="space-between" direction="row" w="full">
        <Text mt={4}>Time: </Text>
        <Input
          type="time"
          value={time}
          onChange={handleTimeChange}
          w="full"
          maxW="sm"
        />
      </Flex>
      <Flex justify="space-between" direction="row" w="full">
        <Text mt={4}>Fare: </Text>
        <Input
          type="number"
          value={fare}
          onChange={handleFareChange}
          w="full"
          maxW="sm"
        />
      </Flex>
      
      <Flex justify="center" direction="row" w="full">
        <Button onClick={() => removeScheduleEntry(currentKey)}>Remove</Button>
      </Flex>
    </Box>
  );
}

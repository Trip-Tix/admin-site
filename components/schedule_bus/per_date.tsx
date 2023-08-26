import { Day, SchedulingContext } from "@public/common/temporary_context";
import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { ScheduleEntry } from "@public/common/bus_interfaces";
import PerTime from "@components/schedule_bus/per_time";
import { formatDate } from "@public/common/date_util";
import { postScheduleInfo } from "@public/common/bus_api";

interface PerDateProps {
  currentDate: Day;
  submitted: boolean;
}

export default function PerDate({ currentDate, submitted }: PerDateProps) {
  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([]);
  const [id, setId] = useState(0);
  const addScheduleEntry = () => {
    setId(id + 1);
    setScheduleEntries([
      ...scheduleEntries,
      {
        key: id,
        date: formatDate(currentDate),
        time: "00:00 AM",
        fare: 0,
        uniqueBusId: "",
      },
    ]);
  };
  const removeScheduleEntry = (index: number) => {
    const updatedScheduleEntries = scheduleEntries.filter(
      (entry) => entry.key !== index,
    );
    setScheduleEntries(updatedScheduleEntries);
  };

  useEffect(() => {
    console.log(scheduleEntries);
  }, [scheduleEntries]);

  //finally submitting results
  const { startingLocation, destinations } = useContext(SchedulingContext);
  useEffect(() => {
    if (submitted) {
      const tempSchedule = [];
      scheduleEntries.forEach((entry) => {
        tempSchedule.push({
          time: entry.time,
          fare: entry.fare,
          uniqueBusId: entry.uniqueBusId,
        });
      });
      postScheduleInfo({
        src: startingLocation,
        dest: destinations,
        date: formatDate(currentDate),
        schedule: tempSchedule,
      });
    }
  }, [submitted]);

  return (
    <>
      <Flex justify="space-between" direction="row" w="full">
        <Text mt={4}>
          Date: {currentDate.day}/{currentDate.month}/{currentDate.year}
        </Text>
      </Flex>
      {scheduleEntries.map((entry) => (
        <PerTime
          key={entry.key}
          currentKey={entry.key}
          scheduleEntries={scheduleEntries}
          setScheduleEntries={setScheduleEntries}
          removeScheduleEntry={removeScheduleEntry}
        />
      ))}
      <Button
        colorScheme="red"
        variant="outline"
        onClick={() => addScheduleEntry()}
      >
        Add Schedule Entry
      </Button>
      <Divider />
    </>
  );
}

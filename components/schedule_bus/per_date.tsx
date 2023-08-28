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
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/router";
import { home_url } from "@public/common/pagelinks";

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
        fare: [],
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
  const router = useRouter();
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
      }).then((response) => {
        router.push(home_url);
      });
    }
  }, [submitted, router]);

  return (
    <>
      <Flex
        justify="space-between"
        direction="row"
        w="full"
        m={2}
        alignItems={"center"}
      >
        <Flex alignItems={"center"}>
          <Text fontWeight={"bold"} mr={2}>
            Schedule for:
          </Text>
          <Text bg={"gray.500"} borderRadius={5} padding={2}>
            {formatDate(currentDate)}
          </Text>
        </Flex>
        <Button onClick={() => addScheduleEntry()}>
          <IoMdAddCircle />
        </Button>
      </Flex>
      {scheduleEntries.map((entry) => (
        <PerTime
          key={entry.key}
          destinations={destinations}
          currentKey={entry.key}
          scheduleEntries={scheduleEntries}
          setScheduleEntries={setScheduleEntries}
          removeScheduleEntry={removeScheduleEntry}
        />
      ))}

      <Divider />
    </>
  );
}

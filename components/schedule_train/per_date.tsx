import { Day, TrainSchedulingContext } from "@public/common/context";
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
import { ScheduleEntry, scheduleCoach, scheduleTrainReturnType } from "@public/common/train_interfaces";
import PerTime from "@components/schedule_train/per_time";
import { formatDate } from "@public/common/date_util";
import { postScheduleInfo } from "@public/common/train_api";
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
  const [selectedTrains, setSelectedTrains] = useState<scheduleTrainReturnType[]>([]);

  const addScheduleEntry = () => {
    setId(id + 1);
    setScheduleEntries([
      ...scheduleEntries,
      {
        key: id,
        date: formatDate(currentDate),
        time: "00:00 AM",
        coachIds: [],
        numOfCoaches: [],
        fare: [],
        uniqueTrainId: "",
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
  const { startingLocation, destinations } = useContext(TrainSchedulingContext);
  useEffect(() => {
    if (submitted) {
      const tempSchedule = [];
      scheduleEntries.forEach((entry) => {
        const tempCoaches: scheduleCoach[] = [];
        entry.coachIds.forEach((coachId, i) => {
          const newCoach: scheduleCoach = {
            [coachId]: {
              fare: entry.fare[i],
              numberOfCoach: entry.numOfCoaches[i],
            }
          };
          tempCoaches.push(newCoach);
        });
        tempSchedule.push({
          time: entry.time,
          coaches: tempCoaches,
          uniqueTrainId: entry.uniqueTrainId,
        });
      });
      console.log("Sched: ", tempSchedule);
      postScheduleInfo({
        src: startingLocation.location_id,
        dest: destinations[destinations.length-1].location_id,
        destPoints: destinations.map((dest) => dest.location_id),
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
          currentKey={entry.key}
          scheduleEntries={scheduleEntries}
          setScheduleEntries={setScheduleEntries}
          removeScheduleEntry={removeScheduleEntry}
          selectedTrains={selectedTrains}
          setSelectedTrains={setSelectedTrains}
          destinations={destinations}
        />
      ))}

      <Divider />
    </>
  );
}

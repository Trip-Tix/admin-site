import { ScheduleEntry } from "@public/common/bus_interfaces";
import { ChangeEvent, use, useEffect, useState } from "react";
import { Box, Text, Button, Flex, Input } from "@chakra-ui/react";
import { fetchCoachBrandList, fetchAllUniqueBus } from "@public/common/bus_api";
import { coachBrands } from "@public/common/bus_interfaces";
import { formatDate, convertTo12HourFormat } from "@public/common/date_util";

interface PerTimeProps {
  destinations: string[];
  currentKey: number;
  scheduleEntries: ScheduleEntry[];
  setScheduleEntries: (value: ScheduleEntry[]) => void;
  removeScheduleEntry: (index: number) => void;
}

export default function PerTime({
  destinations,
  currentKey,
  scheduleEntries,
  setScheduleEntries,
  removeScheduleEntry,
}: PerTimeProps) {
  //first fetch all available coaches and brands
  const [coachBrandList, setCoachBrandList] = useState<coachBrands[]>([]);
  useEffect(() => {
    fetchCoachBrandList().then((data) => {
      setCoachBrandList(data);
    });
  }, []);

  //then list all available coaches
  const [coachList, setCoachList] = useState<string[]>([]);
  useEffect(() => {
    const tempList = coachBrandList.map((brand) => brand.coachName);
    setCoachList(tempList);
  }, [coachBrandList]);
  const [coach, setCoach] = useState("");
  const handleCoachChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCoach(event.target.value);
  };
  const [coachId, setCoachId] = useState(0);
  useEffect(() => {
    coachBrandList.forEach((brand) => {
      if (brand.coachName === coach) {
        setCoachId(brand.coachId);
      }
    });
  }, [coach, coachBrandList]);

  //then according to selected coach, list all available brands
  const [brandList, setBrandList] = useState<string[]>([]);
  useEffect(() => {
    const tempList: string[] = [];
    coachBrandList.forEach((brand) => {
      if (brand.coachName === coach) {
        tempList.push(...brand.brandList);
      }
    });
    setBrandList(tempList);
  }, [coach, coachBrandList]);
  const [brand, setBrand] = useState("");
  const handleBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBrand(event.target.value);
  };

  //time data
  const [time, setTime] = useState("00:00");
  const [time24, setTime24] = useState("00:00");
  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime24(event.target.value);
    setTime(convertTo12HourFormat(event.target.value));
  };

  //now according to selected date, time, coach and brand fetch all the possible unique bus id
  const [uniqueBusList, setUniqueBusList] = useState<string[]>([]);
  const [isUniqueBusListLoading, setIsUniqueBusListLoading] = useState(false);
  useEffect(() => {
    setIsUniqueBusListLoading(true);
    fetchAllUniqueBus({
      date: scheduleEntries[currentKey].date,
      time: time,
      coachId: coachId,
      brandName: brand,
    }).then((data) => {
      setUniqueBusList(data);
      setIsUniqueBusListLoading(false);
    });
  }, [coachId, brand, time, scheduleEntries, currentKey]);
  const [uniqueBusId, setUniqueBusId] = useState("");

  //fare data
  const [fare, setFare] = useState<number[]>([0]);
  useEffect(() => {
    const tempList: number[] = [];
    destinations.forEach(() => {
      tempList.push(0);
    });
    setFare(tempList);
  }, [destinations]);

  //every time you change something, update the schedule entry
  useEffect(() => {
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
  }, [fare, uniqueBusId, time]);

  return (
    <Box>
      <Flex justify="space-between" direction="row" w="full">
        <Text mt={4}>Time: </Text>
        <Input
          type="time"
          value={time24}
          onChange={handleTimeChange}
          w="full"
          maxW="sm"
        />
      </Flex>
      <Flex justify="space-between" direction="row" w="full">
        <Text mt={4}>Coach: </Text>
        <select onChange={handleCoachChange} value={coach}>
          <option value="">Select Coach</option>
          {coachList.map((coach) => (
            <option key={coach} value={coach}>
              {coach}
            </option>
          ))}
        </select>
      </Flex>
      <Flex justify="space-between" direction="row" w="full">
        <Text mt={4}>Brand: </Text>
        <select onChange={handleBrandChange} value={brand}>
          <option value="">Select Brand</option>
          {brandList.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </Flex>
      <Flex justify="space-between" direction="row" w="full">
        <Text mt={4}>Unique Bus: </Text>
        <select
          onChange={(event) => setUniqueBusId(event.target.value)}
          value={uniqueBusId}
        >
          <option value="">Select Unique Bus</option>
          {uniqueBusList.map((uniqueBus) => (
            <option key={uniqueBus} value={uniqueBus}>
              {uniqueBus}
            </option>
          ))}
        </select>
      </Flex>
      <Flex justify="space-between" direction="row" w="full">
        {fare.map((item, index) => (
          <Flex key={index} justify="space-between" direction="row" w="full">
            <Text mt={4}>{destinations[index]}: </Text>
            <Input
              type="number"
              value={item}
              onChange={(event) => {
                const tempFare = [...fare];
                tempFare[index] = parseInt(event.target.value);
                setFare(tempFare);
              }}
              w="full"
              maxW="sm"
            />
          </Flex>
        ))}
      </Flex>

      <Flex justify="center" direction="row" w="full">
        <Button onClick={() => removeScheduleEntry(currentKey)}>Remove</Button>
      </Flex>
    </Box>
  );
}

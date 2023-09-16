import { ScheduleEntry } from "@public/common/bus_interfaces";
import { ChangeEvent, use, useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Input,
  Divider,
  Grid,
  GridItem,
  HStack,
  VStack,
  Select,
  Wrap,
} from "@chakra-ui/react";
import {
  fetchCoachBrandList,
  fetchAllAvailableBus,
} from "@public/common/bus_api";
import { coachBrands } from "@public/common/bus_interfaces";
import { formatDate, convertTo12HourFormat } from "@public/common/date_util";
import { AiOutlineClose } from "react-icons/ai";

interface PerTimeProps {
  destinations: string[];
  currentKey: number;
  scheduleEntries: ScheduleEntry[];
  setScheduleEntries: (value: ScheduleEntry[]) => void;
  removeScheduleEntry: (index: number) => void;
  availableBoardingPoints: string[];
}

export default function PerTime({
  destinations,
  currentKey,
  scheduleEntries,
  setScheduleEntries,
  removeScheduleEntry,
  availableBoardingPoints,
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
    if (
      scheduleEntries[currentKey] === null ||
      scheduleEntries[currentKey] === undefined
    )
      return;
    if (coachId === 0 || brand === "" || time === "00:00") return;
    setIsUniqueBusListLoading(true);
    fetchAllAvailableBus(
      scheduleEntries[currentKey].date,
      time,
      coachId,
      brand,
    ).then((data) => {
      console.log(data);
      setUniqueBusList(data);
      setIsUniqueBusListLoading(false);
    });
  }, [coachId, brand, time, currentKey]);
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

  const [selectedBoardingPoints, setSelectedBoardingPoints] = useState<string[]>(['']); 

  const handleAddBoardingPoint = () => {
    setSelectedBoardingPoints(prevPoints => [...prevPoints, '']);
  };

  
  const [disabledBoardingPoints, setDisabledBoardingPoints] = useState<string[]>([]);
  
  
  const handleDropdownChange = (index: number, value: string) => {
    const updatedPoints = [...selectedBoardingPoints];
    const previousValue = updatedPoints[index];
    updatedPoints[index] = value;
    setSelectedBoardingPoints(updatedPoints);

    // Update the disabled boarding points
    const newDisabledPoints = [...disabledBoardingPoints];
    if (value) {
      newDisabledPoints.push(value);
    }
    // If there was a previous value and it's not being used by any other dropdown, remove it from disabled points
    if (previousValue && !updatedPoints.includes(previousValue)) {
      const removeIndex = newDisabledPoints.indexOf(previousValue);
      if (removeIndex !== -1) {
        newDisabledPoints.splice(removeIndex, 1);
      }
    }
    setDisabledBoardingPoints(newDisabledPoints);
};


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
      <Grid templateColumns="33% 66%" gap={6} w={"100%"} alignItems="start">
        <Flex direction="row" w="100%" alignItems={"center"} mt={12}>
          <Text mr={6}>Time: </Text>
          <Input
            type="time"
            value={time24}
            onChange={handleTimeChange}
            w="full"
            maxW="sm"
          />
        </Flex>

        <Flex direction="column" w="100%" m={2}>
          <Text mb={4}>Boarding Points:</Text>
          <Wrap spacing={4}>
              {selectedBoardingPoints.map((point, index) => (
                  <Box key={index} w={selectedBoardingPoints.length === 1 ? "96%" : "48%"}>
                      <Flex
                          align="center"
                          justify="space-between"
                          direction="row"
                          w="full"
                      >
                          <Select
                            placeholder="Select Boarding Point"
                            width={selectedBoardingPoints.length === 1 ? "95%" : "85%"}
                            value={point}
                            onChange={(e) => handleDropdownChange(index, e.target.value)}
                          >
                            {availableBoardingPoints.map(bp => (
                              <option key={bp} value={bp} disabled={disabledBoardingPoints.includes(bp)}>
                                {bp}
                              </option>
                            ))}
                          </Select>                      
                          <Button
                              onClick={() => {
                                  const updatedPoints = [...selectedBoardingPoints];
                                  const removedValue = updatedPoints[index];
                                  updatedPoints.splice(index, 1);
                                  setSelectedBoardingPoints(updatedPoints);

                                  // If the removed value is not being used by any other dropdown, remove it from disabled points
                                  if (!updatedPoints.includes(removedValue)) {
                                      const removeIndex = disabledBoardingPoints.indexOf(removedValue);
                                      if (removeIndex !== -1) {
                                          const newDisabledPoints = [...disabledBoardingPoints];
                                          newDisabledPoints.splice(removeIndex, 1);
                                          setDisabledBoardingPoints(newDisabledPoints);
                                      }
                                  }
                              }}
                              isDisabled={index === 0}
                          >
                              <AiOutlineClose />
                          </Button>
                      </Flex>
                  </Box>
              ))}
          </Wrap>
          <Flex direction="column" w="96%" m={2}>
          <Button 
              mt={4} 
              onClick={handleAddBoardingPoint} 
              isDisabled={selectedBoardingPoints.length >= availableBoardingPoints.length}
          >
              Add Boarding Point
          </Button>

          </Flex>
        </Flex>



      </Grid>


      <Flex direction="row" justifyContent="space-between" w="100%" mt={4}>
        <Box w="32%">
          <Text mb={2}>Coach:</Text>
          <Select onChange={handleCoachChange} value={coach}>
            <option value="">Select Coach</option>
            {coachList.map((coach) => (
              <option key={coach} value={coach}>
                {coach}
              </option>
            ))}
          </Select>
        </Box>
        <Box w="32%">
          <Text mb={2}>Brand:</Text>
          <Select onChange={handleBrandChange} value={brand}>
            <option value="">Select Brand</option>
            {brandList.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Select>
        </Box>
        <Box w="32%">
          <Text mb={2}>Unique Bus:</Text>
          {isUniqueBusListLoading ? (
            <Text>Loading...</Text>
          ) : (
            <Select
              onChange={(event) => setUniqueBusId(event.target.value)}
              value={uniqueBusId}
            >
              <option value="">Select Unique Bus</option>
              {uniqueBusList.map((uniqueBus) => (
                <option key={uniqueBus} value={uniqueBus}>
                  {uniqueBus}
                </option>
              ))}
            </Select>
          )}
        </Box>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} w={"100%"} mt={6} mb={6}>
        <GridItem colSpan={2}>
          <Text>Fare: </Text>
        </GridItem>
        {fare.map((item, index) => (
          <Flex key={index} direction="row" w="full" alignItems={"center"}>
            <Text mr={6}>{destinations[index]}: </Text>
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
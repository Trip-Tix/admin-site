import { useState, useContext, useEffect } from "react";
import {
  Flex,
  Text,
  Input,
  VStack,
  Divider,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Spacer,
  Select,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { SchedulingContext, Day } from "@public/common/context";
import { fetchLocations } from "@public/common/bus_api";
import { AiFillFlag, AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

interface InitialFormProps {
  isInitialForm: boolean;
  setIsInitialForm: (value: boolean) => void;
}

export default function InitialForm({
  isInitialForm,
  setIsInitialForm,
}: InitialFormProps) {
  const {
    startingLocation,
    setStartingLocation,
    destinations,
    setDestinations,
    startingDate,
    setStartingDate,
    endingDate,
    setEndingDate,
  } = useContext(SchedulingContext);

  const handleDestinationChange = (index: number, value: string) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
  };

  const addDestination = () => {
    setDestinations([...destinations, ""]);
  };

  const removeDestination = (index: number) => {
    const updatedDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(updatedDestinations);
  };


  const bgColor = useColorModeValue("gray.300", "gray.800");
  const borderColor = useColorModeValue("gray.400", "gray.700");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.600");
  const optionColor = useColorModeValue("gray.800", "gray.200");


  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const parseDate = (date: string): Day => {
    const [yearstr, monthstr, daystr] = date.split("-");
    const year = parseInt(yearstr);
    const month = parseInt(monthstr);
    const day = parseInt(daystr);
    return { year, month, day };
  };

  useEffect(() => {
    setStartingDate(parseDate(date1));
    setEndingDate(parseDate(date2));
  }, [date1, date2]);

  useEffect(() => {
    console.log({
      startingLocation,
      destinations,
      startingDate,
      endingDate,
    });
  }, [startingLocation, destinations, startingDate, endingDate]);

  const [locations, setLocations] = useState<string[]>([]);
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchLocations().then((locations) => {
      setLocations(locations);
      setLocationLoading(false);
    });
  }, []);

  return (
    <>
      {isInitialForm ? (
        <>
          {locationLoading ? (
            <Flex align="center" justify="center" direction="row" w="full">
              <Text fontSize="xl" fontWeight="bold" p={2}>
                {" "}
                Loading Locations{" "}
              </Text>
              <Spinner />
            </Flex>
          ) : (
            <>
              <Flex
                align="center"
                justify="space-between"
                direction="row"
                w="full"
              >
                <Text fontSize="xl" fontWeight="bold" p={2}>
                  {" "}
                  Starting Location{" "}
                </Text>
                <Text fontSize="xl" fontWeight="bold" p={2}>
                  {" "}
                  Destinations{" "}
                </Text>
              </Flex>
              <Flex
                align="flex-start"
                justify="space-between"
                direction="row"
                w="full"
                p={2}
                m={2}
              >
                <Select
                  placeholder="Select Location"
                  width={"40%"}
                  onChange={(e) => setStartingLocation(e.target.value)}
                  value={startingLocation}
                >
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </Select>

                <VStack spacing={3} align={"right"} w="40%">
                  {destinations.map((destination, index) => (
                    <Flex
                      key={index}
                      align="center"
                      justify="space-between"
                      direction="row"
                      w="full"
                    >
                      <Select
                        placeholder="Select Location"
                        width={"full"}
                        value={destination}
                        onChange={(e) =>
                          handleDestinationChange(index, e.target.value)
                        }
                      >
                        {locations.map((location, index) => (
                          <option key={index} value={location}>
                            {location}
                          </option>
                        ))}
                      </Select>
                      <Button onClick={() => removeDestination(index)}>
                        Remove
                      </Button>
                    </Flex>
                  ))}
                  <Button onClick={addDestination}>Add Destination</Button>
                </VStack>
              </Flex>
            </>
          )}
          <Flex align="center" justify="space-between" direction="row" w="full">
            <Text fontSize="xl" fontWeight="bold" p={2}>
              {" "}
              Starting Date{" "}
            </Text>
            <Text fontSize="xl" fontWeight="bold" p={2}>
              {" "}
              Ending Date{" "}
            </Text>
          </Flex>
          <Flex
            align="flex-start"
            justify="space-between"
            direction="row"
            w="full"
            p={2}
            m={2}
          >
            <Input
              type="date"
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              width={"40%"}
            />
            <Input
              type="date"
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              width={"40%"}
            />
          </Flex>
          <Button
            colorScheme="green"
            onClick={() => setIsInitialForm(false)}
            w={"100%"}
            rightIcon={<AiOutlineArrowRight />}
            borderRadius={0}
            isDisabled={
              startingLocation === "" ||
              destinations.length === 0 ||
              destinations.some((destination) => destination === "") ||
              date1 === "" ||
              date2 === ""
            }
          />
        </>
      ) : (
        <>
          <Flex direction="column" w="full" p={4} boxShadow="md" borderRadius="md" bg={bgColor}>
            <Flex justify="space-between" mb={4}>
              <Box flex="1" mr={4}>
                <Text fontSize="md" fontWeight="bold" mb={1}>Starting Location:</Text>
                <Flex alignItems="center">
                  {/* <Box as={AiOutlineArrowRight} size="24px" color={optionColor} mr={2} /> */}
                  <Box as={FaMapMarkerAlt} size="24px" color={optionColor} mr={2} />
                  <Text fontSize="2xl" color={optionColor}>{startingLocation}</Text>
                </Flex>
              </Box>

              <Box flex="1" mr={4}>
                <Text fontSize="md" fontWeight="bold" mb={1}>Destinations:</Text>
                <VStack alignItems="start" spacing={2}>
                  {destinations.map((destination, index) => (
                    <Flex key={index} alignItems="center">
                      {index === destinations.length - 1 && (
                        <Box as={AiFillFlag} size="24px" color={optionColor} mr={2} />
                      )}
                      {index !== destinations.length - 1 && (
                        <Box as={AiOutlineArrowDown} size="24px" color={optionColor} mr={2} />
                      )}
                      <Text fontSize="2xl" color={optionColor}>{destination}</Text>
                    </Flex>
                  ))}
                </VStack>
              </Box>

              <Box flex="1" mr={4}>
                <Text fontSize="md" fontWeight="bold" mb={1}>Starting Date:</Text>
                <Flex alignItems="center">
                  <Box as={FaRegCalendarAlt} size="24px" color={optionColor} mr={2} />
                  <Text fontSize="3xl" color={optionColor}>{date1}</Text>
                </Flex>
              </Box>

              <Box flex="1" mr={4}>
                <Text fontSize="md" fontWeight="bold" mb={1}>Ending Date:</Text>
                <Flex alignItems="center">
                  <Box as={FaRegCalendarAlt} size="24px" color={optionColor} mr={2} />
                  <Text fontSize="3xl" color={optionColor}>{date2}</Text>
                </Flex>
              </Box>

            </Flex>

            <Button onClick={() => setIsInitialForm(true)} colorScheme="blue" size="lg" mt={4}>
              Edit
            </Button>
          </Flex>

        </>
      )}
    </>
  );
}

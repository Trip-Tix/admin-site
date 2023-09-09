import { useState, useContext, useEffect } from "react";
import ReactSelect from "react-select";
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
  theme,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { TrainSchedulingContext, Day } from "@public/common/context";
import { fetchTrainLocations } from "@public/common/train_api";
import { AiFillFlag, AiFillPlayCircle, AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";
import { locationInfo } from "@public/common/train_interfaces";
import { FaMapMarkerAlt, FaMapPin, FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";

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
  } = useContext(TrainSchedulingContext);

  
  const bgColor = useColorModeValue("gray.300", "gray.800");
  const borderColor = useColorModeValue("gray.400", "gray.700");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.600");
  const optionColor = useColorModeValue("gray.800", "gray.200");


  const handleDestinationChange = (index: number, value: number) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
  };
  

  const addDestination = () => {
    setDestinations([...destinations, 0]);
  };

  const removeDestination = (index: number) => {
    const updatedDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(updatedDestinations);
  };

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

  const [locations, setLocations] = useState<locationInfo[]>([]);
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchTrainLocations().then((locations) => {
      setLocations(locations);
      setLocationLoading(false);
    });
  }, []);

  const { colorMode } = useColorMode();

  const customStyles = (isStartingLocation) => ({
    control: (provided) => ({
      ...provided,
      backgroundColor: bgColor,
      borderColor: borderColor,
      "&:hover": {
        borderColor: hoverBorderColor,
      },
      height: '70px', // Increase the height to make it thicker
      width: "100%",   // Increase the width
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.colors.blue[500]
        : state.isFocused
        ? theme.colors.blue[100]
        : colorMode === "light" ? theme.colors.gray[300] : theme.colors.gray[800],
      color: state.isSelected
        ? theme.colors.white
        : state.isFocused
        ? theme.colors.black
        : optionColor,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: bgColor,
      borderColor: borderColor,
      width: "100%",   // Increase the width
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: bgColor,
    }),
    container: (provided) => ({
      ...provided,
      width: isStartingLocation ? "40%" : "85%",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: optionColor,
    }),
    input: (provided) => ({
      ...provided,
      color: optionColor,
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: optionColor,
      backgroundColor: colorMode === "light" ? theme.colors.gray[300] : theme.colors.gray[800],
      padding: '10px',
      textAlign: 'center',
    }),
  });

  type ExtendedOption = {
    value: number;
    label: string;
    data: locationInfo;
  };
  
  
  const formatOptionLabel = (option) => (
    <div>
      <div style={{ fontSize: 'larger' }}>
        {option.data.location_name}
      </div>
      <div>{option.data.station_name}</div>
    </div>
  );
  
  const currentStartingLocation = locations.find(loc => loc.location_id === startingLocation);
  const currentDestinations = locations.filter(loc => destinations.includes(loc.location_id));

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
                <ReactSelect
                  styles={customStyles(true)}
                  options={locations.map((location) => ({
                    value: location.location_id,
                    label: location.location_name + " " + location.station_name,
                    data: location,
                  }))}
                  onChange={(option) => setStartingLocation(option.value)}
                  placeholder="Select Destination"
                  formatOptionLabel={formatOptionLabel}
                  value={currentStartingLocation ? {
                    value: currentStartingLocation.location_id,
                    label: currentStartingLocation.location_name + " " + currentStartingLocation.station_name,
                    data: currentStartingLocation
                  } : null}
                />

                <VStack spacing={3} align={"right"} w="50%">
                {destinations.map((destination, index) => (
                  <Flex
                    key={index}
                    align="center"
                    justify="space-between"
                    direction="row"
                    w="full"
                  >
                    <ReactSelect
                      styles={customStyles(false)}
                      options={locations.map((location) => ({
                        value: location.location_id,
                        label: location.location_name + " " + location.station_name,
                        data: location,
                      }))}
                      onChange={(option) => handleDestinationChange(index, option.value)}
                      placeholder="Select Location"
                      formatOptionLabel={formatOptionLabel}
                      value={
                        locations.find(loc => loc.location_id === destination) 
                        ? {
                          value: destination,
                          label: locations.find(loc => loc.location_id === destination).location_name + " " + locations.find(loc => loc.location_id === destination).station_name,
                          data: locations.find(loc => loc.location_id === destination)
                        } 
                        : null
                      }
                    />
                    <Button 
                      height="70px" 
                      width={["50px", "70px", "70px", "70px", "14%"]} // responsive width
                      fontSize={["sm", "md", "md", "md", "lg"]}  // responsive font size
                      px={2} // padding on x-axis
                      onClick={() => removeDestination(index)}
                    >
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
              startingLocation === 0 ||
              destinations.length === 0 ||
              destinations.some((destination) => destination === 0) ||
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
                  <div>
                    <div style={{ fontSize: 'larger' }}>
                      {locations.find(loc => loc.location_id === startingLocation)?.location_name}
                    </div>
                    <div>
                      {locations.find(loc => loc.location_id === startingLocation)?.station_name}
                    </div>
                  </div>
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
                      <div>
                        <div style={{ fontSize: 'larger' }}>
                          {locations.find(loc => loc.location_id === destination)?.location_name}
                        </div>
                        <div>
                          {locations.find(loc => loc.location_id === destination)?.station_name}
                        </div>
                      </div>
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

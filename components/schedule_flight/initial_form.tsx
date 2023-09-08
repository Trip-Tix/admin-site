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
import { AirSchedulingContext, Day } from "@public/common/context";
import { fetchFlightLocations } from "@public/common/flight_api";
import { AiOutlineArrowRight } from "react-icons/ai";
import { locationInfo } from "@public/common/flight_interfaces";

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
    destinationLocation,
    setDestinationLocation,
    startingDate,
    setStartingDate,
    endingDate,
    setEndingDate,
  } = useContext(AirSchedulingContext);

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

  const [locations, setLocations] = useState<locationInfo[]>([]);
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchFlightLocations().then((locations) => {
      setLocations(locations);
      setLocationLoading(false);
    });
  }, []);

  const { colorMode } = useColorMode();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: bgColor,
      borderColor: borderColor,
      "&:hover": {
        borderColor: hoverBorderColor,
      },
      height: '80px', // Increase the height to make it thicker
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
      width: "40%",
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
  };
  
  const formatOptionLabel = (option) => (
    <div>
      <div style={{ fontSize: 'larger' }}>
        {option.data.location_name} ({option.data.location_code}), {option.data.country_name}
      </div>
      <div>{option.data.airport_name}</div>
    </div>
  );

  const currentStartingLocation = locations.find(loc => loc.location_id === startingLocation);
  const currentDestinationLocation = locations.find(loc => loc.location_id === destinationLocation);



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
                  Destination Location{" "}
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
                  styles={customStyles}
                  options={locations.map((location) => ({
                    value: location.location_id,
                    label: location.location_name + " (" + location.location_code + "), " + location.country_name + ", " + location.airport_name,
                    data: location,
                  }))}
                  onChange={(option) => setStartingLocation(option.value)}
                  placeholder="Select Starting Location"
                  formatOptionLabel={formatOptionLabel}
                  value={currentStartingLocation ? {
                    value: currentStartingLocation.location_id,
                    label: currentStartingLocation.location_name + " (" + currentStartingLocation.location_code + "), " + currentStartingLocation.country_name + ", " + currentStartingLocation.airport_name,
                    data: currentStartingLocation
                  } : null}
                />

                <ReactSelect
                  styles={customStyles}
                  options={locations.map((location) => ({
                    value: location.location_id,
                    label: location.location_name + " (" + location.location_code + "), " + location.country_name + ", " + location.airport_name,
                    data: location,
                  }))}
                  onChange={(option) => setDestinationLocation(option.value)}
                  placeholder="Select Destination Location"
                  formatOptionLabel={formatOptionLabel}
                  value={currentDestinationLocation ? {
                    value: currentDestinationLocation.location_id,
                    label: currentDestinationLocation.location_name + " (" + currentDestinationLocation.location_code + "), " + currentDestinationLocation.country_name + ", " + currentDestinationLocation.airport_name,
                    data: currentDestinationLocation
                  } : null}
                />
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
              destinationLocation === 0 ||
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
                  <div>
                    <div style={{ fontSize: 'larger' }}>
                      {locations.find(loc => loc.location_id === startingLocation)?.location_name} 
                      ({locations.find(loc => loc.location_id === startingLocation)?.location_code}), 
                      {locations.find(loc => loc.location_id === startingLocation)?.country_name}
                    </div>
                    <div>
                      {locations.find(loc => loc.location_id === startingLocation)?.airport_name}
                    </div>
                  </div>
                </Flex>
              </Box>

              <Box flex="1" mr={4}>
                <Text fontSize="md" fontWeight="bold" mb={1}>Destination Location:</Text>
                <Flex alignItems="center">
                  {/* <Box as={AiOutlineArrowRight} size="24px" color={optionColor} mr={2} /> */}
                  <div>
                    <div style={{ fontSize: 'larger' }}>
                      {locations.find(loc => loc.location_id === destinationLocation)?.location_name} 
                      ({locations.find(loc => loc.location_id === destinationLocation)?.location_code}), 
                      {locations.find(loc => loc.location_id === destinationLocation)?.country_name}
                    </div>
                    <div>
                      {locations.find(loc => loc.location_id === destinationLocation)?.airport_name}
                    </div>
                  </div>
                </Flex>
              </Box>

              <Box flex="1" mr={4}>
                <Text fontSize="md" fontWeight="bold" mb={1}>Starting Date:</Text>
                <Text fontSize="3xl" color={optionColor}>{date1}</Text>
              </Box>

              <Box flex="1" mr={4}>
                <Text fontSize="md" fontWeight="bold" mb={1}>Ending Date:</Text>
                <Text fontSize="3xl" color={optionColor}>{date2}</Text>
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

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
} from "@chakra-ui/react";
import { SchedulingContext, Day } from "@public/common/temporary_context";
import { fetchLocations } from "@public/common/bus_api";

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
          <Flex align="center" justify="space-between" direction="row" w="full">
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
            >
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </Select>

            <VStack spacing={3} align={"right"} w="40%">
              {/* {destinations.map((destination, index) => (
                <InputGroup key={index}>
                  <Input
                    value={destination}
                    onChange={(e) =>
                      handleDestinationChange(index, e.target.value)
                    }
                    key={index}
                    width={"full"}
                  />
                  <InputRightElement width={"4.5rem"}>
                    <Button onClick={() => removeDestination(index)}>
                      Remove
                    </Button>
                  </InputRightElement>
                </InputGroup>
              ))} */}
              {destinations.map((destination, index) => (
                <Flex key={index} align="center" justify="space-between" direction="row" w="full">
                  <Select 
                    placeholder="Select Location"
                    width={"full"}
                    onChange={(e) => handleDestinationChange(index, e.target.value)}
                  >
                    {locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
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
          <Button onClick={() => setIsInitialForm(false)} m={2}>
            Next
          </Button>
        </>
      ) : (
        <>
          <Flex align="center" justify="space-between" direction="row" w="full">
            <Text fontSize="xl" fontWeight="bold" pl={2}>
              Starting Location:
            </Text>
            <Text fontSize="xl" pr={2}>
              {startingLocation}
            </Text>
            <Text fontSize="xl" fontWeight="bold" pl={2}>
              Destinations:
            </Text>
            <Text fontSize="xl" pr={2}>
              {destinations.join(", ")}
            </Text>
            <Text fontSize="xl" fontWeight="bold" pl={2}>
              Starting Date:
            </Text>
            <Text fontSize="xl" pr={2}>
              {date1}
            </Text>
            <Text fontSize="xl" fontWeight="bold" pl={2}>
              Ending Date:
            </Text>
            <Text fontSize="xl" pr={2}>
              {date2}
            </Text>
          </Flex>
          <Button onClick={() => setIsInitialForm(true)} m={2}>
            Edit
          </Button>
        </>
      )}
    </>
  );
}

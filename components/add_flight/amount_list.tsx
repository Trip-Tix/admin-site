import React, { useEffect, useState } from "react";
import {
  HStack,
  Text,
  Input,
  Spinner,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
  VStack,
  Center,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { fetchExistingFlightIds } from "@public/common/flight_api";
import { class_interface } from "@public/common/flight_interfaces";

interface AmountListProps {
  classes: class_interface[];
  numFlight: number;
  setNumFlight: (numFlight: number) => void;
  uniqueFlightId: string[];
  setUniqueFlightId: (uniqueFlightId: string[]) => void;
  removalAction: {
    key: string;
    removeFlight: (key: string) => void;
    validateFlight: (key: string, isValid: boolean) => void;
  };
}

export default function AmountList({
  classes,
  numFlight,
  setNumFlight,
  uniqueFlightId,
  setUniqueFlightId,
  removalAction,
}: AmountListProps) {
  const [company, setCompany] = useState<string>(
    sessionStorage.getItem("company-name") || "",
  );

  // fetch data
  const [existingFlightId, setExistingFlightId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetchExistingFlightIds().then((res) => {
      setExistingFlightId(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(existingFlightId);
  }, [existingFlightId]);

  // array generation for flight id
  const [wrongFlightId, setWrongFlightId] = useState<boolean[]>([]);
  useEffect(() => {
    const tempUniqueFlightId: string[] = [];
    for (let i = 0; i < numFlight; i++) {
      tempUniqueFlightId.push("");
    }
    setUniqueFlightId(tempUniqueFlightId);
    const tempWrongFlightId: boolean[] = [];
    for (let i = 0; i < numFlight; i++) {
      tempWrongFlightId.push(false);
    }
    setWrongFlightId(tempWrongFlightId);
  }, [numFlight]);


  const getAbbreviation = (classes: class_interface[]): string => {
    return classes.map(cls => cls.className.charAt(0).toUpperCase()).join('');
  };
  
  // handle input change
  const handleInputChange = (index: number, value: string) => {
    const abbreviation = getAbbreviation(classes);
    const updatedUniqueFlightId = [...uniqueFlightId];
    updatedUniqueFlightId[index] = `${company}-${abbreviation}-${value}`;
    setUniqueFlightId(updatedUniqueFlightId);

    if (existingFlightId.includes(`${company}-${abbreviation}-${value}`)) {
      const updatedWrongFlightId = [...wrongFlightId];
      updatedWrongFlightId[index] = true;
      setWrongFlightId(updatedWrongFlightId);
    } else {
      const updatedWrongFlightId = [...wrongFlightId];
      updatedWrongFlightId[index] = false;
      setWrongFlightId(updatedWrongFlightId);
    }
  };


  // validate input
  useEffect(() => {
    if (numFlight === 0) {
      removalAction.validateFlight(removalAction.key, false);
    } else {
      if (uniqueFlightId.includes("")) {
        removalAction.validateFlight(removalAction.key, false);
      } else if (wrongFlightId.includes(true)) {
        removalAction.validateFlight(removalAction.key, false);
      } else {
        removalAction.validateFlight(removalAction.key, true);
      }
    }
  }, [numFlight, wrongFlightId, uniqueFlightId]);

  return (
    <>
      {loading ? (
        <>
          <Text>Loading... </Text>
          <Spinner />
        </>
      ) : (
        <>
          {/* Selecting Number of Flight */}
          <VStack align={"left"} spacing={4} w="100%" m={"1rem"}>
            <Text>Number of Flight</Text>
            <Slider
              focusThumbOnChange={false}
              value={numFlight}
              onChange={(e) => setNumFlight(e)}
              min={1}
              max={50}
              ml={"1rem"}
              w={"80%"}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" color={"black"}>
                {numFlight}
              </SliderThumb>
            </Slider>
          </VStack>
          {wrongFlightId.includes(true) && (
            <Text color="red.500" m={"1rem"}>
              Flight ID already exists
            </Text>
          )}
          <Grid templateColumns="repeat(2, 1fr)" gap={6} m={"1rem"}>
            {Array.from({ length: numFlight }).map((_, index) => (
              <GridItem key={index}>
                <Flex alignItems="center">
                  <Text
                    flexShrink={0}
                    color={wrongFlightId[index] ? "red.500" : "default"}
                  >{`${company}-${getAbbreviation(classes)}-`}</Text>
                  <Input
                    flex="1"
                    placeholder={` Flight ${index + 1} ID`}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    isInvalid={wrongFlightId[index]}
                    color={wrongFlightId[index] ? "red.500" : "default"}
                    textAlign="left"
                    pl={0}
                  />
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

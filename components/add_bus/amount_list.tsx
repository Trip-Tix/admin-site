import React, { use, useEffect, useState } from "react";
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
import { fetchExistingBusIds } from "@public/common/bus_api";

interface AmountListProps {
  coachId: number;
  coachName: string;
  brandName: string;
  numBus: number;
  setNumBus: (numBus: number) => void;
  uniqueBusId: string[];
  setUniqueBusId: (uniqueBusId: string[]) => void;
  removalAction: {
    key: string;
    removeCoach: (key: string) => void;
    validateCoach: (key: string, isValid: boolean) => void;
  };
}

export default function AmountList({
  coachId,
  coachName,
  brandName,
  numBus,
  setNumBus,
  uniqueBusId,
  setUniqueBusId,
  removalAction,
}: AmountListProps) {
  const [company, setCompany] = useState<string>(
    sessionStorage.getItem("company-name") || "",
  );

  // fetch data
  const [existingBusId, setExistingBusId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetchExistingBusIds(coachId, brandName).then((res) => {
      setExistingBusId(res);
      setLoading(false);
    });
  }, [coachId, brandName]);
  useEffect(() => {
    console.log(existingBusId);
  }, [existingBusId]);

  // array generation for bus id
  const [wrongBusId, setWrongBusId] = useState<boolean[]>([]);
  useEffect(() => {
    const tempUniqueBusId: string[] = [];
    for (let i = 0; i < numBus; i++) {
      tempUniqueBusId.push("");
    }
    setUniqueBusId(tempUniqueBusId);
    const tempWrongBusId: boolean[] = [];
    for (let i = 0; i < numBus; i++) {
      tempWrongBusId.push(false);
    }
    setWrongBusId(tempWrongBusId);
  }, [numBus]);

  // handle input change
  const handleInputChange = (index: number, value: string) => {
    const updatedUniqueBusId = [...uniqueBusId];
    updatedUniqueBusId[index] = `${company}-${coachName}-${brandName}-${value}`;
    setUniqueBusId(updatedUniqueBusId);
    if (
      existingBusId.includes(`${company}-${coachName}-${brandName}-${value}`)
    ) {
      const updatedWrongBusId = [...wrongBusId];
      updatedWrongBusId[index] = true;
      setWrongBusId(updatedWrongBusId);
    } else {
      const updatedWrongBusId = [...wrongBusId];
      updatedWrongBusId[index] = false;
      setWrongBusId(updatedWrongBusId);
    }
  };

  // validate input
  useEffect(() => {
    if (numBus === 0) {
      removalAction.validateCoach(removalAction.key, false);
    } else {
      if (uniqueBusId.includes("")) {
        removalAction.validateCoach(removalAction.key, false);
      } else if (wrongBusId.includes(true)) {
        removalAction.validateCoach(removalAction.key, false);
      } else {
        removalAction.validateCoach(removalAction.key, true);
      }
    }
  }, [numBus, wrongBusId, uniqueBusId]);

  return (
    <>
      {loading ? (
        <>
          <Text>Loading... </Text>
          <Spinner />
        </>
      ) : (
        <>
          {/* Selecting Number of Bus */}
          <VStack align={"left"} spacing={4} w="100%" m={"1rem"}>
            <Text>Number of Bus</Text>
            <Slider
              focusThumbOnChange={false}
              value={numBus}
              onChange={(e) => setNumBus(e)}
              min={1}
              max={50}
              ml={"1rem"}
              w={"80%"}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" color={"black"}>
                {numBus}
              </SliderThumb>
            </Slider>
          </VStack>
          {wrongBusId.includes(true) && (
            <Text color="red.500" m={"1rem"}>
              Bus ID already exists
            </Text>
          )}
          <Grid templateColumns="repeat(2, 1fr)" gap={6} m={"1rem"}>
            {Array.from({ length: numBus }).map((_, index) => (
              <GridItem key={index}>
                <Flex alignItems="center">
                  <Text
                    flexShrink={0}
                    color={wrongBusId[index] ? "red.500" : "default"}
                  >{`${company}-${coachName}-${brandName}-`}</Text>
                  <Input
                    flex="1"
                    placeholder={` Bus ${index + 1} ID`}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    isInvalid={wrongBusId[index]}
                    color={wrongBusId[index] ? "red.500" : "default"}
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

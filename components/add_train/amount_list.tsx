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
import { fetchExistingTrainIds } from "@public/common/train_api";
import { coach_interface } from "@public/common/train_interfaces";

interface AmountListProps {
  coaches: coach_interface[];
  numTrain: number;
  setNumTrain: (numTrain: number) => void;
  uniqueTrainId: string[];
  setUniqueTrainId: (uniqueTrainId: string[]) => void;
  removalAction: {
    key: string;
    removeTrain: (key: string) => void;
    validateTrain: (key: string, isValid: boolean) => void;
  };
}

export default function AmountList({
  coaches,
  numTrain,
  setNumTrain,
  uniqueTrainId,
  setUniqueTrainId,
  removalAction,
}: AmountListProps) {
  const [company, setCompany] = useState<string>(
    sessionStorage.getItem("company-name") || "",
  );

  // fetch data
  const [existingTrainId, setExistingTrainId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetchExistingTrainIds().then((res) => {
      setExistingTrainId(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(existingTrainId);
  }, [existingTrainId]);

  // array generation for train id
  const [wrongTrainId, setWrongTrainId] = useState<boolean[]>([]);
  useEffect(() => {
    const tempUniqueTrainId: string[] = [];
    for (let i = 0; i < numTrain; i++) {
      tempUniqueTrainId.push("");
    }
    setUniqueTrainId(tempUniqueTrainId);
    const tempWrongTrainId: boolean[] = [];
    for (let i = 0; i < numTrain; i++) {
      tempWrongTrainId.push(false);
    }
    setWrongTrainId(tempWrongTrainId);
  }, [numTrain]);


  const getAbbreviation = (coaches: coach_interface[]): string => {
    return coaches.map(cls => cls.coachName.charAt(0).toUpperCase()).join('');
  };
  
  // handle input change
  const handleInputChange = (index: number, value: string) => {
    const abbreviation = getAbbreviation(coaches);
    const updatedUniqueTrainId = [...uniqueTrainId];
    updatedUniqueTrainId[index] = `${company}-${abbreviation}-${value}`;
    setUniqueTrainId(updatedUniqueTrainId);

    if (existingTrainId.includes(`${company}-${abbreviation}-${value}`)) {
      const updatedWrongTrainId = [...wrongTrainId];
      updatedWrongTrainId[index] = true;
      setWrongTrainId(updatedWrongTrainId);
    } else {
      const updatedWrongTrainId = [...wrongTrainId];
      updatedWrongTrainId[index] = false;
      setWrongTrainId(updatedWrongTrainId);
    }
  };


  // validate input
  useEffect(() => {
    if (numTrain === 0) {
      removalAction.validateTrain(removalAction.key, false);
    } else {
      if (uniqueTrainId.includes("")) {
        removalAction.validateTrain(removalAction.key, false);
      } else if (wrongTrainId.includes(true)) {
        removalAction.validateTrain(removalAction.key, false);
      } else {
        removalAction.validateTrain(removalAction.key, true);
      }
    }
  }, [numTrain, wrongTrainId, uniqueTrainId]);

  return (
    <>
      {loading ? (
        <>
          <Text>Loading... </Text>
          <Spinner />
        </>
      ) : (
        <>
          {/* Selecting Number of Train */}
          <VStack align={"left"} spacing={4} w="100%" m={"1rem"}>
            <Text>Number of Train</Text>
            <Slider
              focusThumbOnChange={false}
              value={numTrain}
              onChange={(e) => setNumTrain(e)}
              min={1}
              max={50}
              ml={"1rem"}
              w={"80%"}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" color={"black"}>
                {numTrain}
              </SliderThumb>
            </Slider>
          </VStack>
          {wrongTrainId.includes(true) && (
            <Text color="red.500" m={"1rem"}>
              Train ID already exists
            </Text>
          )}
          <Grid templateColumns="repeat(2, 1fr)" gap={6} m={"1rem"}>
            {Array.from({ length: numTrain }).map((_, index) => (
              <GridItem key={index}>
                <Flex alignItems="center">
                  <Text
                    flexShrink={0}
                    color={wrongTrainId[index] ? "red.500" : "default"}
                  >{`${company}-${getAbbreviation(coaches)}-`}</Text>
                  <Input
                    flex="1"
                    placeholder={` Train ${index + 1} ID`}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    isInvalid={wrongTrainId[index]}
                    color={wrongTrainId[index] ? "red.500" : "default"}
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

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
  const [company, setCompany] = useState<string>(sessionStorage.getItem("company-name") || "");

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
    if (existingBusId.includes(`${company}-${coachName}-${brandName}-${value}`)) {
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
        <VStack m={"1rem"} w={"100%"}>
          <HStack>
            <Text w={"100%"}>Number of Bus: </Text>
            <Input onChange={(e) => setNumBus(parseInt(e.target.value))} />
          </HStack>
          {wrongBusId.includes(true) && (
            <Text color="red.500">Bus ID already exists</Text>
          )}
          {Array.from({ length: numBus }).map((_, index) => (
            <Flex key={index} alignItems="center">
              <Text
                flexShrink={0}
                color={wrongBusId[index] ? "red.500" : "default"}
              >{`${company}-${coachName}-${brandName}-`}</Text>
              <Input
                flex="1"
                placeholder={`Bus ${index + 1} ID`}
                onChange={(e) => handleInputChange(index, e.target.value)}
                isInvalid={wrongBusId[index]}
                color={wrongBusId[index] ? "red.500" : "default"}
              />
            </Flex>
          ))}
        </VStack>
      )}
    </>
  );
}

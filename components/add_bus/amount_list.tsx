import React, { useEffect, useState } from "react";
import { HStack, Text, Input, Spinner, FormControl, FormErrorMessage } from "@chakra-ui/react";

interface AmountListProps {
  coachId: number;
  brandName: string;
  numBus: number;
  setNumBus: (numBus: number) => void;
  uniqueBusId: string[];
  setUniqueBusId: (uniqueBusId: string[]) => void;
}

export default function AmountList({
  coachId,
  brandName,
  numBus,
  setNumBus,
  uniqueBusId,
  setUniqueBusId,
}: AmountListProps) {
  const [existingBusId, setExistingBusId] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [wrongBusId, setWrongBusId] = useState<boolean[]>([]);

  // use api in later Stage using coachId and brandName
  useEffect(() => {
    setLoading(true);
    const tempBusId: string[] = [];
    for (let i = 0; i < 4; i++) {
      tempBusId.push("busId" + i);
    }

    setExistingBusId(tempBusId);
    setLoading(false);
  }, [coachId, brandName]);

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

  const handleInputChange = (index: number, value: string) => {
    const updatedUniqueBusId = [...uniqueBusId];
    updatedUniqueBusId[index] = value;
    setUniqueBusId(updatedUniqueBusId);
    if (existingBusId.includes(value)) {
      const updatedWrongBusId = [...wrongBusId];
      updatedWrongBusId[index] = true;
      setWrongBusId(updatedWrongBusId);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Text>Loading... </Text>
          <Spinner />
        </>
      ) : (
        <>
          <HStack>
            <Text>Number of Bus: </Text>
            <Input onChange={(e) => setNumBus(parseInt(e.target.value))} />
          </HStack>
          {Array.from({ length: numBus }).map((_, index) => (
            <FormControl key={index} isInvalid={wrongBusId[index]}>
              <Input
                placeholder={`Bus ${index + 1} ID`}
                value={uniqueBusId[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <FormErrorMessage>
                {"Bus Id Already Exist"}
              </FormErrorMessage>
            </FormControl>
          ))}
        </>
      )}
    </>
  );
}

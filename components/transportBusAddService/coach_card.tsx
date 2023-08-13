import { All_seat_view } from "./all_seat_view";
import {
  Box,
  Flex,
  InputGroup,
  Select,
  Text,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
} from "@chakra-ui/react";
import {
  background,
  darkerBackground,
  foreground,
  lightForeground,
  accent,
} from "@public/commonData/Colors";
import { useState } from "react";
import Seat from "@components/transportBusAddService/seat";


interface Props{
  
}


export default function CoachCard() {
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [coachType, setCoachType] = useState("");
  const [coachSelected, setCoachSelected] = useState(false);

  const selectCoach = (coach) => {
    setCoachType(coach);
    setCoachSelected(true);
  };

  return (
    <Box
      bg={darkerBackground}
      w="100%"
      p={5}
      color={foreground}
      rounded={"10"}
      shadow={"md"}
    >
      <Flex justifyContent={"space-between"}>
        <VStack spacing={5} align={""}>
          {/*Select Coach*/}
          {!coachSelected && (
            <FormControl>
              <FormLabel>Coach</FormLabel>
              <Select
                placeholder="Select Coach"
                onChange={(e) => selectCoach(e.target.value)}
              >
                <option>Ac Seat</option>
                <option>Seat</option>
                <option>Sleeper</option>
              </Select>
            </FormControl>
          )}

          {coachSelected && (
            <>
              <Heading as={"h1"} textAlign={"left"}>
                {coachType}
              </Heading>
              {/*Amount Field*/}
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput max={100} min={1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              {/*Select Row*/}
              <FormControl>
                <FormLabel>Row</FormLabel>
                <NumberInput
                  max={20}
                  min={1}
                  onChange={(value) => setRow(Number(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              {/*Select Column*/}
              <FormControl>
                <FormLabel>Column</FormLabel>
                <NumberInput
                  max={20}
                  min={2}
                  onChange={(value) => setColumn(Number(value) == 1 ? 2 : Number(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </>
          )}
        </VStack>

        {coachSelected && (
          <VStack spacing={5}>
            <Text>Seat Layout</Text>
            <Box
              bg={background}
              w="100%"
              p={5}
              color={foreground}
              rounded={"10"}
              shadow={"md"}
            >
              <All_seat_view
                row={row}
                column={column}
              />
            </Box>
          </VStack>
        )}
      </Flex>
    </Box>
  );
}

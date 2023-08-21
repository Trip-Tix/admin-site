import { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
} from "@chakra-ui/react";
import { SchedulingContext, Day } from "@public/common/temporary_context";

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

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Td>Starting Location</Td>
            <Td>Destinations</Td>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Input
                value={startingLocation}
                onChange={(e) => setStartingLocation(e.target.value)}
              />
            </Td>
            <Td>
              <Stack spacing={3}>
                {destinations.map((destination, index) => (
                  <Box key={index}>
                    <Input
                      value={destination}
                      onChange={(e) =>
                        handleDestinationChange(index, e.target.value)
                      }
                    />
                    <Button onClick={() => removeDestination(index)}>
                      Remove
                    </Button>
                  </Box>
                ))}
              </Stack>
              <Button onClick={addDestination}>Add Destination</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Table>
        <Thead>
          <Tr>
            <Td>Starting Date</Td>
            <Td>Ending Date</Td>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Stack direction="row" spacing={2}>
                <Input
                  type="number"
                  placeholder="Day"
                  value={startingDate.day}
                />
                <Input
                  type="number"
                  placeholder="Month"
                  value={startingDate.month}
                />
                <Input
                  type="number"
                  placeholder="Year"
                  value={startingDate.year}
                />
              </Stack>
            </Td>
            <Td>
              <Stack direction="row" spacing={2}>
                <Input type="number" placeholder="Day" value={endingDate.day} />
                <Input
                  type="number"
                  placeholder="Month"
                  value={endingDate.month}
                />
                <Input
                  type="number"
                  placeholder="Year"
                  value={endingDate.year}
                />
              </Stack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

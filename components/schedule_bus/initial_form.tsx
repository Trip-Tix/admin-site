import { useState, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
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
    <Box>
      <FormControl>
        <FormLabel>Starting Location</FormLabel>
        <Input
          value={startingLocation}
          onChange={(e) => setStartingLocation(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Destinations</FormLabel>
        <Stack spacing={3}>
          {destinations.map((destination, index) => (
            <Box key={index}>
              <Input
                value={destination}
                onChange={(e) => handleDestinationChange(index, e.target.value)}
              />
              <Button onClick={() => removeDestination(index)}>Remove</Button>
            </Box>
          ))}
        </Stack>
        <Button onClick={addDestination}>Add Destination</Button>
      </FormControl>

      {/* Add your visualization (SVG, graphics, etc.) here */}
      <FormControl>
        <FormLabel>Starting Date</FormLabel>
        <Stack direction="row" spacing={2}>
          <Input type="number" placeholder="Day" value={startingDate.day} />
          <Input type="number" placeholder="Month" value={startingDate.month} />
          <Input type="number" placeholder="Year" value={startingDate.year} />
        </Stack>
      </FormControl>

      <FormControl>
        <FormLabel>Ending Date</FormLabel>
        <Stack direction="row" spacing={2}>
          <Input type="number" placeholder="Day" value={endingDate.day} />
          <Input type="number" placeholder="Month" value={endingDate.month} />
          <Input type="number" placeholder="Year" value={endingDate.year} />
        </Stack>
      </FormControl>
    </Box>
  );
}

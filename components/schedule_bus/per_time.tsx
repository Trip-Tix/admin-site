import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Flex,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  Checkbox,
  MenuItemOption,
} from "@chakra-ui/react";
import { Day } from "@public/common/temporary_context";

const busOptions = [
  "Ena",
  "Hanif",
  "GreenLine",
  "Shyamoli Paribahan",
  "Sakura Paribahan",
  "Desh Travels",
  "S.A. Paribahan",
  "Soudia Air Con",
  "Star Line Special",
  "Eagle Paribahan",
  "Sheba Green Line",
  "Nabil Paribahan",
  "Nabil Enterprise",
  "Royal Coach",
  "Shohagh Paribahan",
  "RATAN Paribahan",
  "Saintmartin Paribahan",
  "R Travels",
  "Silkline",
  "Unique Service",
  "Eagle Super Air",
  "SALAM Paribahan",
  "Skyline",
  "Shanti Paribahan",
  "Shah Bahadur",
  "Kuakata Express",
  "Comfort Line",
  "TR Travels",
  "Manik Express",
  "Shohag Paribahan",
  "Nasir Enterprise",
  "Saudia Coach Service",
  "Purbasha Paribahan",
  "Shyamoli NR Travels",
  "Karatoya Deluxe",
  "Ruposhi Bangla Paribahan",
  "Silk Line Paribahan",
  "S.R Travels",
  "Himachol Paribahan",
  "Saintmartin Paribahan",
  "BRTC",
  "Pachamba Transport",
  "Grameen Travels",
  "Rupa Enterprise",
  "Pallabi Paribahan",
  "Sakura Paribahan",
  "Bangladesh Paribahan",
  "Hanif Enterprise",
  "Shyamoli Paribahan",
  "Dola Paribahan",
  "Rajib Paribahan",
  "Shanti Paribahan",
  "Hossain Enterprise",
  "Green Dhaka",
  "Bikash Paribahan",
  "Soudia Air Con",
  "Dhaka Express",
  "Green Line",
  "Tisha Paribahan",
  "S.R Travels",
  "BRTC",
  "Sakura Paribahan",
  "Shohagh Paribahan",
  "Unique Service",
  "Star Line Special",
  "Shyamoli NR Travels",
  "Skyline",
  "Eagle Paribahan",
  "S.A. Paribahan",
  "Desh Travels",
  "Sheba Green Line",
  "Nabil Paribahan",
  "RATAN Paribahan",
  "Saintmartin Paribahan",
  "Silkline",
  "SALAM Paribahan",
  "Karatoya Deluxe",
  "Comfort Line",
  "TR Travels",
  "Shohag Paribahan",
  "Nasir Enterprise",
  "Saudia Coach Service",
  "Purbasha Paribahan",
  "Shyamoli Paribahan",
  "Rajib Paribahan",
];

interface PerTimeProps {
  index: number;
  time: { hour: number; minute: number };
  updateTimeEntry: (index: number, hour: number, minute: number) => void;
  removeTimeEntry: (index: number) => void;
  date: Day;
}

export default function PerTime({
  index,
  time,
  updateTimeEntry,
  removeTimeEntry,
  date,
}: PerTimeProps) {
  const handleHourChange = (event) => {
    updateTimeEntry(index, Number(event.target.value), time.minute);
  };

  const handleMinuteChange = (event) => {
    updateTimeEntry(index, time.hour, Number(event.target.value));
  };

  const handleRemove = () => {
    removeTimeEntry(index);
  };

  const [selectedBus, setSelectedBus] = useState("");

  return (
    <>
      <HStack>
        {/* <Text>
        Time: 
        <input type="number" value={time.hour} onChange={handleHourChange} />:
        <input type="number" value={time.minute} onChange={handleMinuteChange} />
      </Text> */}
        <FormControl display="flex" flexDirection="row" alignItems="center">
          <FormLabel m={2}>Hour</FormLabel>
          <NumberInput max={24} min={0} onChange={handleHourChange} m={2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormLabel m={2}>Minute</FormLabel>
          <NumberInput max={24} min={0} onChange={handleMinuteChange} m={2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button onClick={handleRemove}>Remove</Button>
      </HStack>
      <HStack spacing={4}>
        <FormControl display="flex" flexDirection="row" alignItems="center">
          <FormLabel>Coach</FormLabel>
          <Select placeholder="Select coach">
            <option>Coach A</option>
            <option>Coach B</option>
            {/* Add more options as needed */}
          </Select>
        </FormControl>

        <FormControl display="flex" flexDirection="row" alignItems="center">
          <FormLabel>Bus</FormLabel>
          <Menu>
            <MenuButton as={Button}>{selectedBus || "Select bus"}</MenuButton>
            <MenuList>
              <Input placeholder="Search bus" mb={2} />
              <MenuGroup title="Bus Options">
                <MenuOptionGroup
                  type="radio" // Use type "radio"
                  onChange={(value) => setSelectedBus(value)} // Use a single value
                  value={selectedBus}
                >
                  {busOptions.map((bus, index) => (
                    <MenuItemOption key={index} value={bus}>
                      {bus}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuGroup>
            </MenuList>
          </Menu>
        </FormControl>

        <FormControl display="flex" flexDirection="row" alignItems="center">
          <FormLabel>Fare</FormLabel>
          <NumberInput max={1000} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </HStack>
    </>
  );
}

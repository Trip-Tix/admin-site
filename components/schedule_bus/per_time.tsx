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
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { Day } from "@public/common/temporary_context";

const busOptions = [
  { name: "Ena", availableSeat: 10, availableNumber: 1 },
  { name: "Hanif", availableSeat: 15, availableNumber: 2 },
  { name: "GreenLine", availableSeat: 8, availableNumber: 3 },
  { name: "Shyamoli Paribahan", availableSeat: 20, availableNumber: 4 },
  { name: "Sakura Paribahan", availableSeat: 12, availableNumber: 5 },
  { name: "Desh Travels", availableSeat: 18, availableNumber: 6 },
  { name: "S.A. Paribahan", availableSeat: 25, availableNumber: 7 },
  { name: "Soudia Air Con", availableSeat: 30, availableNumber: 8 },
  { name: "Star Line Special", availableSeat: 9, availableNumber: 9 },
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box borderRadius={5} bg={useColorModeValue("gray.300", "gray.700")} p={2} m={2}>
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

          <Button onClick={onOpen} w={"full"}>
            {selectedBus || "Select bus"}
          </Button>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Select your bus</DrawerHeader>

              <DrawerBody>
                {busOptions.map((bus, index) => (
                  <VStack key={index} onClick={() => { setSelectedBus(bus.name); onClose() }} cursor={"pointer"} align={"left"} m={2}>
                    <Heading size={"md"}>
                      Name: {bus.name}
                    </Heading>
                    <Text>
                      Available Seat: {bus.availableSeat}
                    </Text>
                    <Text>
                      Available Buses: {bus.availableNumber}
                    </Text>
                  </VStack>
                ))}
              </DrawerBody>

            </DrawerContent>
          </Drawer>



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
        </HStack >
      </Box>
    </>
  );
}

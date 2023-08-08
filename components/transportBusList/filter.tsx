// generate filter box component in chakra ui
// where users can select a service class, time, facilities and price to filter the transport table

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import PriceFilter from "@components/transportBusList/price_filter";

interface TransportTableProps {
  transports: {
    bus_schedule_id: number;
    bus_name: string;
    coach_name: string;
    source: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    bus_fare: number;
    schedule_date: string;
  }[];
  setTransports: React.Dispatch<React.SetStateAction<any[]>>;
  originalTransports: {
    bus_schedule_id: number;
    bus_name: string;
    coach_name: string;
    source: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    bus_fare: number;
    schedule_date: string;
  }[];
}

export default function TransportFilterBox({
  transports,
  setTransports,
  originalTransports,
}: TransportTableProps) {
  const [selectedServiceClass, setSelectedServiceClass] = useState<string[]>(
    [],
  );
  const [selectedArrivalTime, setSelectedArrivalTime] = useState<string[]>([]);

  const serviceClasses = Array.from(
    new Set(transports.map((transport) => transport.coach_name)),
  );
  const arrivalTimes = Array.from(
    new Set(transports.map((transport) => transport.arrival_time)),
  );
  const { minPrice, maxPrice } = originalTransports.reduce(
    (acc, transport) => {
      if (transport.bus_fare < acc.minPrice) {
        acc.minPrice = transport.bus_fare;
      }
      if (transport.bus_fare > acc.maxPrice) {
        acc.maxPrice = transport.bus_fare;
      }
      return acc;
    },
    { minPrice: Infinity, maxPrice: -Infinity },
  );

  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(maxPrice);

  const addServiceClassTag = (serviceClass: string) => {
    if (!selectedServiceClass.includes(serviceClass)) {
      setSelectedServiceClass([...selectedServiceClass, serviceClass]);
    }
  };

  const removeServiceClassTag = (serviceClass: string) => {
    setSelectedServiceClass(
      selectedServiceClass.filter((item) => item !== serviceClass),
    );
  };

  const addTimeTag = (time: string) => {
    if (!selectedArrivalTime.includes(time)) {
      setSelectedArrivalTime([...selectedArrivalTime, time]);
    }
  };

  const removeTimeTag = (time: string) => {
    setSelectedArrivalTime(selectedArrivalTime.filter((item) => item !== time));
  };

  const applyFilters = () => {
    const filteredTransports = transports.filter((transport) => {
      const serviceClassMatch =
        selectedServiceClass.length === 0 ||
        selectedServiceClass.includes(transport.coach_name);
      const timeMatch =
        selectedArrivalTime.length === 0 ||
        selectedArrivalTime.includes(transport.arrival_time);
      const priceMatch = transport.bus_fare <= selectedMaxPrice;
      return serviceClassMatch && timeMatch && priceMatch;
    });

    setTransports(filteredTransports);
  };

  const resetFilters = () => {
    setSelectedServiceClass([]);
    setSelectedArrivalTime([]);
    setTransports(originalTransports);
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      w={"full"}
      maxW={"lg"}
      mx={"center"}
      py={2}
      px={2}
      rounded={"lg"}
      padding={"10"}
    >
      <Flex align="center" justify="space-between" flexDirection="row" mb={5}>
        <Text fontSize="2xl" fontWeight="bold">
          Filter
        </Text>
      </Flex>
      <Stack spacing={8}>
        <Flex flexWrap="wrap" mb={3}>
          {selectedServiceClass.map((serviceClass) => (
            <Tag
              key={serviceClass}
              size="md"
              variant="subtle"
              colorScheme="blue"
              borderRadius="md"
            >
              <TagLabel>{serviceClass}</TagLabel>
              <TagCloseButton
                onClick={() => removeServiceClassTag(serviceClass)}
              />
            </Tag>
          ))}
          {selectedArrivalTime.map((time) => (
            <Tag
              key={time}
              size="md"
              variant="subtle"
              colorScheme="blue"
              borderRadius="md"
            >
              <TagLabel>{time}</TagLabel>
              <TagCloseButton onClick={() => removeTimeTag(time)} />
            </Tag>
          ))}
        </Flex>
        <Box>
          <Text fontSize="md" fontWeight="bold">
            Service Class
          </Text>
          <select onChange={(e) => addServiceClassTag(e.target.value)} value="">
            <option value="" disabled>
              Select Service Class
            </option>
            {serviceClasses.map((serviceClass, index) => (
              <option key={index} value={serviceClass}>
                {serviceClass}
              </option>
            ))}
          </select>
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="bold">
            Arrival Time
          </Text>
          <select onChange={(e) => addTimeTag(e.target.value)} value="">
            <option value="" disabled>
              Select Time
            </option>
            {arrivalTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Box>
        <Box>
          <PriceFilter
            min={minPrice}
            max={maxPrice}
            setSelectedMaxPrice={setSelectedMaxPrice}
          />
        </Box>
        <Button colorScheme="blue" variant="solid" onClick={applyFilters}>
          Filter
        </Button>
        <Button
          ml={2}
          colorScheme="red"
          variant="outline"
          onClick={resetFilters}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
}

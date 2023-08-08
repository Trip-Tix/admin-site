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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import { EditIcon, SearchIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { manage_transports_bus_add_service_url } from "@public/commonData/PageLinks";

import { get_bus_info_url } from "@public/commonData/Api";

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
}

export default function TransportTable({ transports }: TransportTableProps) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransports = transports.filter((transport) =>
    transport.bus_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      rounded={"lg"}
    >
      <Box maxW="1000px" mx="8vw" px={{ base: "4", md: "8" }} py="12">
        <Flex align="center" justify="space-between" flexDirection="row" mb={5}>
          <Text fontSize="2xl" fontWeight="bold">
            Transport
          </Text>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={() => router.push(manage_transports_bus_add_service_url)}
          >
            Add Transport
          </Button>
        </Flex>

        <Flex mb={3} justify="flex-end">
          <InputGroup>
            <Input
              type="text"
              placeholder="Search Service Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputRightElement>
              <SearchIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </Flex>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign={"center"}>Service Name</Th>
              <Th textAlign={"center"}>Service Class</Th>
              <Th textAlign={"center"}>Departure Time</Th>
              <Th textAlign={"center"}>Arrival Time</Th>
              <Th textAlign={"center"}>Price</Th>
              <Th textAlign={"center"}>Departure Place</Th>
              <Th textAlign={"center"}>destination Place</Th>
              <Th colSpan={2} textAlign={"center"}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTransports.map((transport) => (
              <Tr key={transport.bus_schedule_id}>
                <Td>{transport.bus_name}</Td>
                <Td>{transport.coach_name}</Td>
                <Td>{transport.departure_time}</Td>
                <Td>{transport.arrival_time}</Td>
                <Td>{transport.bus_fare}</Td>
                <Td>{transport.source}</Td>
                <Td>{transport.destination}</Td>
                <Td>
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    variant="solid"
                  >
                    Edit
                  </Button>
                </Td>
                <Td>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="solid"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllBus } from "@public/common/bus_api";
import axios from "axios";
import TableItem from "@components/list_bus/table_item";
import { BusInfoContext } from "@public/common/context";
import { coachBrandEntry } from "@public/common/bus_interfaces";
import { fetchAllBusToList } from "@public/common/bus_api";

export default function List() {
  const [busInfoLoading, setBusInfoLoading] = useState<boolean>(true);
  const [busInfo, setBusInfo] = useState<coachBrandEntry[]>([]);

  useEffect(() => {
    fetchAllBusToList().then((res) => {
      setBusInfo(res);
      setBusInfoLoading(false);
    });
  }, []);

  return (
    <VStack spacing={4} align="stretch" flex={1} ml={10} mr={10}>
      <Heading as="h1" size="lg" color="primary.800">
        List of Buses
      </Heading>
      {busInfoLoading ? (
        <>
          <Heading as="h2" size="md" color="primary.800">
            Loading...
          </Heading>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Coach Name</Th>
                <Th>Brand Name</Th>
                <Th isNumeric>Number of Buses</Th>
              </Tr>
            </Thead>
            <Tbody>
              {busInfo.map((bus, index) => (
                <Tr key={index}>
                  <Td>{bus.coachName}</Td>
                  <Td>{bus.brandName}</Td>
                  <Td isNumeric>{bus.numBus}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
}

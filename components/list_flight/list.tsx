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
import { getAllFlight } from "@public/common/api";
import axios from "axios";
import TableItem from "@components/list_flight/table_item";

interface FlightInfo {
  flightName: string;
  flightId: string;
  classId: string;
  amount: number;
}

export default function List() {
  const [flightInfoList, setFlightInfoList] = useState<FlightInfo[]>([]);
  const [flightInfoLoading, setFlightInfoLoading] = useState(true);
  const [userToken, setUserToken] = useState<string>("");

  // api call to get the flight list
  useEffect(() => {
    async function fetchFlightInfo() {
      setFlightInfoLoading(true);
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(getAllFlight, null, {
          headers: {
            usertoken: userToken,
          },
        });

        if (response.status === 200) {
          setFlightInfoList(response.data);
        } else {
          console.error(
            "Failed to fetch flight information",
            "component/list_flight/list.tsx",
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching flight information:",
          error,
          "component/list_flight/list.tsx",
        );
      }
      setFlightInfoLoading(false);
    }
    fetchFlightInfo();
  }, [userToken]);

  return (
    <VStack spacing={4} align="stretch" flex={1} ml={10} mr={10}>
      <Heading as="h1" size="lg" color="primary.800">
        List of Flights
      </Heading>
      {flightInfoLoading ? (
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
                <Th>Flight Name</Th>
                <Th>Flight ID</Th>
                <Th>Class Type</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {flightInfoList.map((flight) => (
                <TableItem
                  key={flight.flightId}
                  name={flight.flightName}
                  flightId={flight.flightId}
                  classId={flight.classId}
                  amount={flight.amount}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
}



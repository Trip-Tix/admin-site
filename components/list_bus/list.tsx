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
import { getAllBus } from "@public/common/server_api";
import axios from "axios";
import TableItem from "@components/list_bus/table_item";

interface BusInfo {
  bus_id: string;
  bus_name: string;
  number_of_buses: number;
  coach_name: string;
  bus_coach_id: string;
}

export default function List() {
  const [busInfoList, setBusInfoList] = useState<BusInfo[]>([]);
  const [busInfoLoading, setBusInfoLoading] = useState(true);
  const [userToken, setUserToken] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  // api call to get the bus list
  useEffect(() => {
    async function fetchBusInfo() {
      setBusInfoLoading(true);
      setUserToken(sessionStorage.getItem("user-token") || "");
      setUsername(sessionStorage.getItem("username") || "");
      const requestBody = {
        adminUsername: username,
      };
      try {
        const response = await axios.post(getAllBus, requestBody, {
          headers: {
            usertoken: userToken,
          },
        });

        if (response.status === 200) {
          setBusInfoList(response.data);
        } else {
          console.error(
            "Failed to fetch bus information",
            "component/list_bus/list.tsx",
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching bus information:",
          error,
          "component/list_bus/list.tsx",
        );
      }
      setBusInfoLoading(false);
    }
    fetchBusInfo();
  }, [userToken]);

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
                <Th>Bus Name</Th>
                <Th>Bus ID</Th>
                <Th>Coach Type</Th>
                <Th isNumeric>Number of Buses</Th>
              </Tr>
            </Thead>
            <Tbody>
              {busInfoList.map((bus) => (
                <TableItem
                  key={bus.bus_coach_id}
                  busName={bus.bus_name}
                  busId={bus.bus_id}
                  coachName={bus.coach_name}
                  amount={bus.number_of_buses}
                  busCoachId={bus.bus_coach_id}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
}



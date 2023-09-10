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
  useColorModeValue,
  Tag,
  Button,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FlightInfoContext } from "@public/common/context";
import { uniqueFlightEntry } from "@public/common/flight_interfaces";
import { fetchAllFlightToList, setFlightStatus } from "@public/common/flight_api";
import { stat } from "fs";

export default function List() {
  const [flightInfoLoading, setFlightInfoLoading] = useState<boolean>(true);
  const [flightInfo, setFlightInfo] = useState<uniqueFlightEntry[]>([]);

  const [handleStatusChangeToggler, setHandleStatusChangeToggler] = useState<boolean>(false);

  const {
    setUniqueFlightId,
    setClassNames,
    setClassIds,
    setLayout,
    setNumSeat,
    setFlightLayoutId,
    setNumTotalSeats,
    setFacilities,
    setStatus,
  } = useContext(FlightInfoContext);

  useEffect(() => {
    fetchAllFlightToList().then((res) => {
      setFlightInfo(res);
      setFlightInfoLoading(false);
    });
  }, []);

  const handleClick = (flight: uniqueFlightEntry) => {
    console.log(flight);
    setUniqueFlightId(flight.uniqueFlightId);
    setClassNames(flight.classNames);
    setClassIds(flight.classIds);
    setLayout(flight.layout);
    setNumSeat(flight.numSeat);
    setFlightLayoutId(flight.flightLayoutId);
    setNumTotalSeats(flight.numTotalSeats);
    setFacilities(flight.facilities);
    setStatus(flight.status);
  };

  const hoverBackgroundColor = useColorModeValue("gray.200", "gray.600");


  async function handleStatusChange(uniqueFlightId: string, status: number) {
    try {
        setFlightInfoLoading(true);
        const message = await setFlightStatus({
            unique_flight_id: uniqueFlightId,
            status: status
        });

        setFlightInfo(prevFlights => {
          return prevFlights.map(flight => {
              if (flight.uniqueFlightId === uniqueFlightId) {
                  return { ...flight, status: status };
              }
              return flight;
          });
        });
        setFlightInfoLoading(false);

        console.log(message);

    } catch (error) {
        console.error("Error updating flight status:", error);
    }
  }

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
                <Th>Classes</Th>
                <Th>Facilities</Th>
                <Th isNumeric>Number of Seats</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {flightInfo.map((flight, index) => (
                <Tr
                  key={index}
                  onClick={() => handleClick(flight)}
                  cursor={"pointer"}
                  _hover={{
                    background: hoverBackgroundColor,
                  }}
                >
                  <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>{flight.uniqueFlightId}</Td>
                  <Td style={{ whiteSpace: 'normal', maxWidth: '200px', paddingTop: '10px', paddingBottom: '10px' }}>
                    {flight.classNames.map((className, idx) => (
                      <Tag key={idx} size="md" borderRadius="md" variant="solid" colorScheme="teal" mr={4} mt={2} mb={2}>
                        {className}
                      </Tag>
                    ))}
                  </Td>
                  <Td style={{ whiteSpace: 'normal', maxWidth: '200px', paddingTop: '10px', paddingBottom: '10px' }}>
                    {flight.facilities.map((facility, idx) => (
                      <Tag key={idx} size="md" borderRadius="md" variant="solid" colorScheme="green" mr={4} mt={2} mb={2}>
                        {facility}
                      </Tag>
                    ))}
                  </Td>
                  <Td isNumeric style={{ paddingTop: '10px', paddingBottom: '10px' }}>{flight.numTotalSeats}</Td>
                  <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    {flight.status === 1 ? (
                      <Tag size="lg" width="100%" borderRadius="md" variant="solid" colorScheme="green">
                        Active
                      </Tag>
                    ) : (
                      <Tag size="lg" width="100%" borderRadius="md" variant="solid" colorScheme="red">
                        Inactive
                      </Tag>
                    )}
                  </Td>
                  <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    {flight.status === 1 ? (
                      <Button style={{ height: '35px', width: '100%' }} 
                      colorScheme="red" onClick={() => handleStatusChange(flight.uniqueFlightId, 0)}>
                        Set Inactive
                      </Button>
                    ) : (
                      <Button style={{ height: '35px', width: '100%' }} 
                      colorScheme="green" onClick={() => handleStatusChange(flight.uniqueFlightId, 1)}>
                        Set Active
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
}

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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BusInfoContext } from "@public/common/context";
import { coachBrandEntry } from "@public/common/bus_interfaces";
import { fetchAllBusToList } from "@public/common/bus_api";

export default function List() {
  const [busInfoLoading, setBusInfoLoading] = useState<boolean>(true);
  const [busInfo, setBusInfo] = useState<coachBrandEntry[]>([]);
  const {
    setCoachId,
    setCoachName,
    setBrandName,
    setLayout,
    setNumBus,
    setNumSeat,
    setBusLayoutId,
    setFacilities,
  } = useContext(BusInfoContext);

  useEffect(() => {
    fetchAllBusToList().then((res) => {
      setBusInfo(res);
      setBusInfoLoading(false);
    });
  }, []);

  const handleClick = (bus: coachBrandEntry) => {
    console.log(bus);
    setCoachId(bus.coachId);
    setCoachName(bus.coachName);
    setBrandName(bus.brandName);
    setLayout(bus.layout);
    setNumBus(bus.numBus);
    setNumSeat(bus.numSeat);
    setBusLayoutId(bus.busLayoutId);
    setFacilities(bus.facilities);
  };
  const hoverBackgroundColor = useColorModeValue("gray.200", "gray.600");

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
                <Th>Facilities</Th>
                <Th isNumeric>Number of Buses</Th>
              </Tr>
            </Thead>
            <Tbody>
              {busInfo.map((bus, index) => (
                <Tr
                  key={index}
                  onClick={() => handleClick(bus)}
                  cursor={"pointer"}
                  _hover={{
                    background: hoverBackgroundColor,
                  }}
                >
                  <Td>{bus.coachName}</Td>
                  <Td>{bus.brandName}</Td>
                  <Td style={{ whiteSpace: 'normal', maxWidth: '200px', paddingTop: '10px', paddingBottom: '10px' }}>
                    {bus.facilities.map((facility, idx) => (
                      <Tag key={idx} size="md" borderRadius="md" variant="solid" colorScheme="green" mr={4} mt={2} mb={2}>
                        {facility}
                      </Tag>
                    ))}
                  </Td>
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

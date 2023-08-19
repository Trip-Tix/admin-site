import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Flex,
  HStack,
  VStack,
  Heading,
  TableContainer,
  Tag,
} from "@chakra-ui/react";
import { useColorModeValue, useColorMode } from "@chakra-ui/color-mode";
import { useContext, useEffect, useState } from "react";
import { BusInfoContext } from "@public/common/context";

interface CoachTagProps {
  coachType: string;
}

function CoachTag({ coachType }: CoachTagProps) {
  const coachColorMap = {
    Luxury: "green",
    Standard: "blue",
    Premium: "purple",
  };
  return (
    <Tag size="md" variant="solid" colorScheme={coachColorMap[coachType]}>
      {coachType}
    </Tag>
  );
}

interface BusInfo {
  busName: string;
  busId: string;
  coachType: string;
  amount: number;
}

export default function List() {
  const busInfoList: BusInfo[] = [
    { busName: "Bus A", busId: "A123", coachType: "Luxury", amount: 150 },
    { busName: "Bus B", busId: "B456", coachType: "Standard", amount: 100 },
    { busName: "Bus C", busId: "C789", coachType: "Premium", amount: 200 },
    { busName: "Bus D", busId: "D101", coachType: "Standard", amount: 120 },
    { busName: "Bus E", busId: "E222", coachType: "Luxury", amount: 180 },
    { busName: "Bus F", busId: "F333", coachType: "Standard", amount: 110 },
    { busName: "Bus G", busId: "G444", coachType: "Premium", amount: 220 },
    { busName: "Bus H", busId: "H555", coachType: "Standard", amount: 130 },
    { busName: "Bus I", busId: "I666", coachType: "Luxury", amount: 160 },
    { busName: "Bus J", busId: "J777", coachType: "Standard", amount: 90 },
    { busName: "Bus K", busId: "K888", coachType: "Premium", amount: 250 },
    { busName: "Bus L", busId: "L999", coachType: "Luxury", amount: 170 },
    { busName: "Bus M", busId: "M111", coachType: "Standard", amount: 95 },
    { busName: "Bus N", busId: "N222", coachType: "Premium", amount: 210 },
    { busName: "Bus O", busId: "O333", coachType: "Standard", amount: 115 },
    // Add more bus information as needed
  ];


  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <VStack spacing={4} align="stretch" flex={1} ml={10} mr={10}>
        <Heading as="h1" size="lg" color="primary.800">
          List of Buses
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Bus Name</Th>
                <Th>Bus ID</Th>
                <Th>Coach Type</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {busInfoList.map((bus) => (
                <TableItem
                  key={bus.busId}
                  name={bus.busName}
                  busId={bus.busId}
                  coachType={bus.coachType}
                  amount={bus.amount}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
}

interface TableItemProps {
  name: string;
  busId: string;
  coachType: string;
  amount: number;
}

function TableItem({ name, busId, coachType, amount }: TableItemProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showDetails, setShowDetails] = useState(false);
  const { setBusId, setCoachId } = useContext(BusInfoContext);

  const handleClick = () => {
    setBusId(busId);
    setCoachId(coachType);
  }
  return (
    <>
      <Tr
        _hover={
          colorMode == "light"
            ? {
                bg: "gray.200",
              }
            : {
                bg: "gray.600",
              }
        }
        cursor={"pointer"}
        onClick={handleClick}
      >
        <Td>{name}</Td>
        <Td>{busId}</Td>
        <Td>
          <CoachTag coachType={coachType} />
        </Td>
        <Td isNumeric>{amount}</Td>
      </Tr>
    </>
  );
}

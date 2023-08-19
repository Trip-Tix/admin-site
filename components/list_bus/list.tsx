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
import { use, useContext, useEffect, useState } from "react";
import { BusInfoContext } from "@public/common/context";
import { getAllBus } from "@public/common/api";
import axios from "axios";

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
  const [busInfoList, setBusInfoList] = useState<BusInfo[]>([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const [busInfoLoading, setBusInfoLoading] = useState(true);

  useEffect(() => {
    async function fetchBusInfo() {
      setBusInfoLoading(true);
      try {
        const userToken = 'your-user-token'; // Replace with your actual user token
        const response = await axios.post(getAllBus, null, {
          headers: {
            'usertoken': userToken,
          },
        });

        if (response.status === 200) {
          setBusInfoList(response.data);
        } else {
          console.error('Failed to fetch bus information', "component/list_bus/list.tsx");
        }
      } catch (error) {
        console.error('An error occurred while fetching bus information:', error, "component/list_bus/list.tsx");
      }
      setBusInfoLoading(false);
    }
    fetchBusInfo();
  }, []);

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
  };
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

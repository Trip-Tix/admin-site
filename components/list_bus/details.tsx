import {
  VStack,
  Heading,
  Flex,
  HStack,
  Text,
  Divider,
  Box,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useContext, useEffect, useState } from "react";
import {
  AiOutlineRight,
  AiOutlineRise,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from "react-icons/ai";

import { BusInfoContext } from "@public/common/context";
import axios from "axios";
import { getBusLayout, getBusRoute, getRouteDetails } from "@public/common/api";

interface seatProps {
  exists: boolean;
}

function Seat({ exists }: seatProps) {

  return (
    <Box
      w={"20px"}
      h={"20px"}
      visibility={exists ? { base: "hidden", md: "visible" } : "hidden"}
      rounded={"md"}
      bg={useColorModeValue("gray.400", "gray.500")}
    />
  );
}

interface RouteItemProps {
  from: string;
  to: string;
  amount: number;
}

interface ScheduleDetail {
  arrivalTime: string;
  destinationTime: string;
  date: string;
}

interface schedulingDetail {
  date: string;
  arrivalTime: string;
  destinationTime: string;
}

function RouteItem({ from, to, amount }: RouteItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { busId, coachId } = useContext(BusInfoContext);
  const [schedulingDetails, setSchedulingDetails] = useState<ScheduleDetail[]>(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = "your_user_token";
        const response = await axios.post<schedulingDetail[]>(
          getRouteDetails,
          {
            busId: busId,
            coachId: coachId,
            from: from,
            to: to,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );
        if (response.status === 200) {
          setSchedulingDetails(response.data);
        } else {
          console.error(
            response.status,
            response.data,
            "component/list_bus/details/RouteItem.tsx",
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [from, to, busId, coachId, showDetails]);

  return (
    <VStack spacing={1} align={"stretch"}>
      <HStack spacing={1}>
        <Text>{to}</Text>
        <AiOutlineRight />
        <Text>{from}</Text>
        <AiOutlineRise />
        <Text>{amount}</Text>
        <Button
          size="xs"
          variant="ghost"
          colorScheme="primary"
          ml={2}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />}
        </Button>
      </HStack>
      <VStack
        spacing={1}
        align={"stretch"}
        display={showDetails ? "flex" : "none"}
      >
        <Text fontWeight="bold">Details</Text>
        {schedulingDetails.map((detail, index) => (
          <Text key={index}>
            Date: {detail.date}, Arrival: {detail.arrivalTime}, Destination:{" "}
            {detail.destinationTime}
          </Text>
        ))}
      </VStack>
    </VStack>
  );
}

type Route = {
  start: string;
  end: string;
  amount: number;
};

function RouteList() {
  const { busId, coachId } = useContext(BusInfoContext);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = "your_user_token";
        const response = await axios.post<Route[]>(
          getBusRoute,
          {
            busId: busId,
            coachId: coachId,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );

        if (response.status === 200) {
          setRoutes(response.data);
        } else {
          console.error(
            response.status,
            response.data,
            "component/list_bus/details/RouteList.tsx",
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [busId, coachId]);

  return (
    <Flex
      direction="column"
      align="stretch"
      width={"100%"}
      background={useColorModeValue("gray.100", "gray.700")}
      borderRadius="0.5rem"
      padding={4}
      boxShadow="md"
    >
      <Text mb={1}>On Routes</Text>
      <Divider />
      <VStack spacing={1} align="stretch" pt={2}>
        {routes.map((route) => (
          <RouteItem
            key={route.start + route.end}
            from={route.start}
            to={route.end}
            amount={route.amount}
          />
        ))}
      </VStack>
    </Flex>
  );
}

export default function Details() {
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [layout, setLayout] = useState([[]]);
  const [RowArray, setRowArray] = useState(Array.from(Array(row).keys()));
  const [ColumnArray, setColumnArray] = useState(
    Array.from(Array(column).keys()),
  );
  const { busId, coachId } = useContext(BusInfoContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = "your_user_token";

        if (!userToken) {
          throw new Error("Unauthorized");
        }

        const response = await axios.post(
          getBusLayout,
          {
            busId: busId,
            coachId: coachId,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );
        if (response.status == 200) {
          const { row, col, layout } = response.data;
          setRow(row);
          setColumn(col);
          setLayout(layout);
          setRowArray(Array.from(Array(row).keys()));
          setColumnArray(Array.from(Array(column).keys()));
        } else {
          console.error(
            response.status,
            response.data,
            "component/list_bus/details/Details.tsx",
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [busId, coachId]);

  return (
    <VStack
      spacing={4}
      align="stretch"
      width={{ base: "0%", md: "30%" }}
      visibility={{ base: "hidden", md: "visible" }}
    >
      <Heading as="h1" size="lg" color="primary.800">
        Details
      </Heading>
      <Flex
        direction="column"
        align="stretch"
        width={"100%"}
        background={useColorModeValue("gray.100", "gray.700")}
        borderRadius="0.5rem"
        padding={4}
        boxShadow="md"
      >
        <HStack spacing={4} align="stretch" width={"100%"}>
          <Text>Bus ID</Text>
          <Divider orientation="vertical" />
          <Text>{busId}</Text>
        </HStack>
      </Flex>
      <Flex
        direction="column"
        align="stretch"
        width={"100%"}
        background={useColorModeValue("gray.100", "gray.700")}
        borderRadius="0.5rem"
        padding={4}
        boxShadow="md"
      >
        <HStack spacing={4} align="stretch" width={"100%"}>
          <Text>Coach Type</Text>
          <Divider orientation="vertical" />
          <Text>{coachId}</Text>
        </HStack>
      </Flex>
      <Flex
        direction="column"
        align="stretch"
        width={"100%"}
        background={useColorModeValue("gray.100", "gray.700")}
        borderRadius="0.5rem"
        padding={4}
        boxShadow="md"
      >
        <HStack spacing={4} align="center">
          <Text>Layout</Text>
          <Divider orientation="vertical" />
          <VStack spacing={1}>
            {RowArray.map((row) => (
              <HStack spacing={1} key={row}>
                {ColumnArray.map((column) => (
                  <Seat exists={layout[row][column] === 1} key={column} />
                ))}
                <Text ml={"10px"}>Row {row}</Text>
              </HStack>
            ))}
          </VStack>
        </HStack>
      </Flex>
      <RouteList />
    </VStack>
  );
}

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

function RouteItem({ from, to, amount }: RouteItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const schedulingDetails: ScheduleDetail[] = [
    {
      arrivalTime: "08:00 AM",
      destinationTime: "12:00 PM",
      date: "2023-08-17",
    },
    {
      arrivalTime: "10:30 AM",
      destinationTime: "02:30 PM",
      date: "2023-08-18",
    },
    {
      arrivalTime: "03:15 PM",
      destinationTime: "07:15 PM",
      date: "2023-08-19",
    },
    // amount of bus
  ];

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

function RouteList() {
  const routes = [
    ["Dhaka", "Chittagong", 20],
    ["Dhaka", "Rajshahi", 25],
    ["Dhaka", "Khulna", 10],
    ["Dhaka", "Sylhet", 5],
    ["Barishal", "Chittagong", 15],
  ];
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
            key={route[0].toString() + route[1].toString()}
            from={route[0].toString()}
            to={route[1].toString()}
            amount={parseInt(route[2].toString())}
          />
        ))}
      </VStack>
    </Flex>
  );
}

export default function Details() {
  const row = 5;
  const column = 4;
  const layout = [
    [1, 0, 1, 1],
    [1, 0, 1, 1],
    [1, 0, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
  ];

  const RowArray = Array.from(Array(row).keys());
  const ColumnArray = Array.from(Array(column).keys());
  const { busId, coachId } = useContext(BusInfoContext);

  useEffect(() => {
    console.log(busId, coachId);
  }, [busId, coachId]);

  return (
    <VStack
      spacing={4}
      align="stretch"
      width={{base:"0%", md:"30%"}}
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
          <Text>02381873184</Text>
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
          <Text>AC</Text>
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

import { Badge, Flex, Heading, Icon, Spacer, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { darkerBackground } from "@public/commonData/Colors";

interface BusSchedule {
  bus_schedule_id: string;
  bus_name: string;
  coach_name: string;
  source: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  bus_fare: number;
  schedule_date: string;
}

interface Props {
  data: BusSchedule;
}

export default function Item({ data }: Props) {
  return (
    <Flex
      direction={"column"}
      background={darkerBackground}
      padding={"2"}
      borderRadius={"5"}
      margin={"1"}
    >
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginLeft={"4"}
        marginRight={"4"}
      >
        <Heading pr={"4"}>{data.bus_name}</Heading>
        <Badge variant="subtle" colorScheme="green" >
          {data.coach_name}
        </Badge>
        <Text m={"1"} fontSize={"lg"} pl={"4"}>
          {data.source}
        </Text>
        <Icon as={ArrowForwardIcon} />
        <Text m={"1"} pr={"4"} fontSize={"lg"}>
          {data.destination}
        </Text>
        <Text m={"1"} pr={"4"}>
          <b>Departure Time:</b> {data.departure_time}{" "}
        </Text>
        <Text m={"1"}>
          <b>Arrival Time:</b> {data.arrival_time}
        </Text>
        <Spacer />
        <Badge
          colorScheme="red"
          paddingLeft={"3"}
          paddingRight={"3"}
          paddingTop={"1"}
          paddingBottom={"1"}
          alignItems={"center"}
          textAlign={"center"}
          fontSize={"lg"}
        >
          {data.bus_fare}$
        </Badge>
      </Flex>
    </Flex>
  );
}

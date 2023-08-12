import {
  Badge,
  Button,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { darkerBackground, lightForeground } from "@public/commonData/Colors";
import React from "react";
import { motion } from "framer-motion";

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

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";

export default function Item({ data }: Props) {
  const [showDetails, setShowDetails] = React.useState(false);
  const handleShowDetails = () => setShowDetails(!showDetails);

  return (
    <Flex
      direction={"column"}
      background={darkerBackground}
      borderRadius={"5"}
      margin={"3"}
    >
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginLeft={"4"}
        marginRight={"4"}
        padding={"2"}
        wrap={"wrap"}
      >
        <Heading pr={"4"}>{data.bus_name}</Heading>
        <Badge variant="subtle" colorScheme="green">
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
        <Text m={"1"} pr={"4"}>
          <b>Arrival Time:</b> {data.arrival_time}
        </Text>
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
        <Spacer />
        <Button
          colorScheme="green"
          size={"lg"}
          mr={"4"}
          leftIcon={<Icon as={InfoOutlineIcon} />}
          onClick={handleShowDetails}
        >
          Details
        </Button>
        <Button
          colorScheme="blue"
          size={"lg"}
          mr={"4"}
          leftIcon={<Icon as={EditIcon} />}
        >
          Edit
        </Button>
        <Button
          colorScheme="red"
          size={"lg"}
          mr={"4"}
          leftIcon={<Icon as={DeleteIcon} />}
        >
          Delete
        </Button>
      </Flex>

      <motion.div
        initial={{ opacity: 0, height: 0, overflow: "hidden" }}
        animate={{
          opacity: 1,
          height: showDetails ? "auto" : 0,
          overflow: "hidden",
        }}
        exit={{ opacity: 0, height: 0, overflow: "hidden" }}
        transition={{ duration: 0.3 }}
      >
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          background={lightForeground}
          color={darkerBackground}
          padding={"2"}
          roundedBottom={"5"}
          wrap={"wrap"}
        >
          <Text>
            {loremIpsum}
          </Text>
        </Flex>
      </motion.div>
    </Flex>
  );
}

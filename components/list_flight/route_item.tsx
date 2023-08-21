import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getRouteDetailsFlight } from "@public/common/api";
import { FlightInfoContext } from "@public/common/context";
import { Text } from "@chakra-ui/react";
import {
  AiOutlineRight,
  AiOutlineRise,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { RxDot } from "react-icons/rx";

interface RouteItemProps {
  from: string;
  to: string[];
  amount: number;
}

interface ScheduleDetail {
  arrivalTime: string;
  destinationTime: string;
  date: string;
}

export default function RouteItem({ from, to, amount }: RouteItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { flightId, classId } = useContext(FlightInfoContext);
  const [schedulingDetails, setSchedulingDetails] = useState<ScheduleDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = "your_user_token"; 
        const response = await axios.post<ScheduleDetail[]>(
          getRouteDetailsFlight, 
          {
            flightId: flightId,
            classId: classId,
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
            "component/list_flight/details/RouteItem.tsx",
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [from, to, flightId, classId, showDetails]);

  return (
    <VStack spacing={1} align={"stretch"}>
      <HStack spacing={1} wrap={"wrap"}>
        <Text>{from}</Text>
        <AiOutlineRight />
        {to.map((item, index) => (
          <HStack key={index}>
            <Text>{item}</Text>
            <RxDot />
          </HStack>
        ))}
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
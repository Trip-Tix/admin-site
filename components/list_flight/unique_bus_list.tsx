import { fetchAllUniqueBusId } from "@public/common/bus_api";
import { useState, useEffect } from "react";
import {
  Flex,
  useColorModeValue,
  Spinner,
  List,
  ListItem,
  Text,
  Divider,
  Box,
  Button,
} from "@chakra-ui/react";

interface BusIdProps {
  coachId: number;
  brandName: string;
  onBusClick: (busId: string) => void;
  activeBusId: string | null;
  schedules: any[];
}

export default function UniqueBusList({ coachId, brandName, onBusClick, activeBusId, schedules }: BusIdProps) {
  const [busList, setBusList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchAllUniqueBusId({ coachId, brandName }).then((res) => {
      setBusList(res);
      setLoading(false);
    });
  }, [coachId, brandName]);

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
      <Text>Unique Bus List</Text>
      <Divider />
      <List spacing={2} mt={2}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {busList.map((busId) => (
              <ListItem key={busId}>
                <Button variant="link" onClick={() => onBusClick(busId)}>[+]</Button> {busId}
                {activeBusId === busId && schedules.map(schedule => (
                  <Box key={schedule.bus_schedule_id} ml={4}>
                  <Text>
                    Starting Point: {schedule.starting_point}
                  </Text>
                  <Text>
                    Ending Point: {schedule.ending_point}
                  </Text>
                  {schedule.destination_points.map((destination, index) => (
                    <Text key={destination}>
                      Destination: {destination} - Fare: ${schedule.bus_fare[index]}
                    </Text>
                  ))}
                  <Text>
                    Departure Time: {schedule.departure_time}
                  </Text>
                  <Text>
                    Schedule Date: {new Date(schedule.schedule_date).toLocaleDateString()}
                  </Text>
                  <Text>
                    Booked Count: {schedule.bookedCount}
                  </Text>
                  <Text>
                    Total Count: {schedule.totalCount}
                  </Text>
                </Box>
                ))}
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Flex>
  );
}

import { Center, Heading, Spinner, VStack, Flex } from "@chakra-ui/react";
import Item from "@components/transportBusList/item";

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

interface TableProps {
  filteredTransports: BusSchedule[];
  loading: boolean;
  searchQuery: string
}

export default function Table({ filteredTransports, loading, searchQuery }: TableProps) {
  console.log(filteredTransports);
  return (
    <Flex w={"100%"} direction={"column"} pt={"3"}>
      {!loading &&
        filteredTransports.length != 0 &&
        filteredTransports.map((data) => (
          <Item key={data.bus_name + data.bus_schedule_id} data={data} />
        ))}
      {loading && (
        <Center>
          <VStack>
            <Heading>Fetching Data</Heading>
            <Spinner size="xl" />
          </VStack>
        </Center>
      )}
    </Flex>
  );
}

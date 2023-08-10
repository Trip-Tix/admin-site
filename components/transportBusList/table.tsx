import { Center, Heading, Spinner, VStack, Flex } from "@chakra-ui/react";
import Item from "@components/transportBusList/item";
import React, {useEffect} from "react";

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
  const [finalFilteredTransports, setFinalFilteredTransports] = React.useState<BusSchedule[]>([])
  useEffect(() => {
    if (searchQuery === "") {
      setFinalFilteredTransports(filteredTransports)
      return
    }
    setFinalFilteredTransports(filteredTransports.filter((transport) => {
      return transport.bus_name.toLowerCase().includes(searchQuery.toLowerCase())
    }))
  }, [searchQuery, filteredTransports])
  return (
    <Flex w={"100%"} direction={"column"} pt={"3"}>
      {!loading &&
        finalFilteredTransports.length != 0 &&
        finalFilteredTransports.map((data) => (
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

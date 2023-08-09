import { Input, InputGroup, InputLeftElement, Center } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';


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
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  }

  export default function SearchBox({ setSearchQuery }: TableProps) {
    return (
      <Center>
      <InputGroup m={"4"}>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input type='tel' placeholder='Search for Bus Name' onChange={(e) => setSearchQuery(e.target.value)} />
    </InputGroup>
    </Center>
    );
    }
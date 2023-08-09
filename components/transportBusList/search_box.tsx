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
        <h1>SearchBox</h1>
    );
    }
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
  }

  export default function Table({ filteredTransports, loading }: TableProps) {
    return (
        <h1>Table</h1>
    );
    }
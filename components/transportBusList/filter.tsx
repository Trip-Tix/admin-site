import { Render_filter } from "./render_filter";
import { useState, useEffect } from "react";

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

interface FilterProps {
  originalTransports: BusSchedule[];
  setFilteredTransports: React.Dispatch<React.SetStateAction<BusSchedule[]>>;
  loading: boolean;
}

export default function Filter({
  originalTransports,
  setFilteredTransports,
  loading,
}: FilterProps) {
  const [sliderValue, setSliderValue] = useState(5);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string[]>([]);
  const [selectedArrivalTime, setSelectedArrivalTime] = useState<string[]>([]);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState<string[]>(
    [],
  );
  const [maxFare, setMaxFare] = useState(100);
  const [coaches, setCoaches] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [arrivalTimes, setArrivalTimes] = useState<string[]>([]);
  const [departureTimes, setDepartureTimes] = useState<string[]>([]);

  useEffect(() => {
    const newCoaches = Array.from(
      new Set(originalTransports.flatMap((t) => t.coach_name)),
    );
    const newSources = Array.from(
      new Set(originalTransports.flatMap((t) => t.source)),
    );
    const newDestinations = Array.from(
      new Set(originalTransports.flatMap((t) => t.destination)),
    );
    const newArrivalTimes = Array.from(
      new Set(originalTransports.flatMap((t) => t.arrival_time)),
    );
    const newDepartureTimes = Array.from(
      new Set(originalTransports.flatMap((t) => t.departure_time)),
    );
    const newMaxFare = Math.max(...originalTransports.map((t) => t.bus_fare));

    setCoaches(newCoaches);
    setSources(newSources);
    setDestinations(newDestinations);
    setArrivalTimes(newArrivalTimes);
    setDepartureTimes(newDepartureTimes);
    setMaxFare(newMaxFare);
    setSliderValue(newMaxFare);
  }, [originalTransports]);

  const addCoach = (coach: string) => {
    if (selectedCoach.includes(coach)) return;
    setSelectedCoach([...selectedCoach, coach]);
  };

  const removeCoach = (coach: string) => {
    setSelectedCoach(selectedCoach.filter((c) => c !== coach));
  };

  const addSource = (source: string) => {
    if (selectedSource.includes(source)) return;
    setSelectedSource([...selectedSource, source]);
  };

  const removeSource = (source: string) => {
    setSelectedSource(selectedSource.filter((s) => s !== source));
  };

  const addDestination = (destination: string) => {
    if (selectedDestination.includes(destination)) return;
    setSelectedDestination([...selectedDestination, destination]);
  };

  const removeDestination = (destination: string) => {
    setSelectedDestination(
      selectedDestination.filter((d) => d !== destination),
    );
  };

  const addArrivalTime = (arrivalTime: string) => {
    if (selectedArrivalTime.includes(arrivalTime)) return;
    setSelectedArrivalTime([...selectedArrivalTime, arrivalTime]);
  };

  const removeArrivalTime = (arrivalTime: string) => {
    setSelectedArrivalTime(
      selectedArrivalTime.filter((a) => a !== arrivalTime),
    );
  };

  const addDepartureTime = (departureTime: string) => {
    if (selectedDepartureTime.includes(departureTime)) return;
    setSelectedDepartureTime([...selectedDepartureTime, departureTime]);
  };

  const removeDepartureTime = (departureTime: string) => {
    setSelectedDepartureTime(
      selectedDepartureTime.filter((d) => d !== departureTime),
    );
  };

  useEffect(() => {
    let newFilteredTransports = originalTransports;
    let filterableCoaches = selectedCoach.length == 0 ? coaches : selectedCoach;
    let filterableSources =
      selectedSource.length == 0 ? sources : selectedSource;
    let filterableDestinations =
      selectedDestination.length == 0 ? destinations : selectedDestination;
    let filterableArrivalTimes =
      selectedArrivalTime.length == 0 ? arrivalTimes : selectedArrivalTime;
    let filterableDepartureTimes =
      selectedDepartureTime.length == 0
        ? departureTimes
        : selectedDepartureTime;

    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableCoaches.includes(t.coach_name),
    );
    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableSources.includes(t.source),
    );
    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableDestinations.includes(t.destination),
    );
    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableArrivalTimes.includes(t.arrival_time),
    );
    newFilteredTransports = newFilteredTransports.filter((t) =>
      filterableDepartureTimes.includes(t.departure_time),
    );
    newFilteredTransports = newFilteredTransports.filter(
      (t) => t.bus_fare <= sliderValue,
    );

    setFilteredTransports(newFilteredTransports);
  }, [
    selectedCoach,
    selectedSource,
    selectedDestination,
    selectedArrivalTime,
    selectedDepartureTime,
    maxFare,
    sliderValue,
    originalTransports,
    setFilteredTransports,
    coaches,
    sources,
    destinations,
    arrivalTimes,
    departureTimes,
  ]);

  const reset = () => {
    setSelectedCoach([]);
    setSelectedSource([]);
    setSelectedDestination([]);
    setSelectedArrivalTime([]);
    setSelectedDepartureTime([]);
    setSliderValue(maxFare);
  };

  return (
    <Render_filter
      filterVisible={filterVisible}
      loading={loading}
      setFilterVisible={setFilterVisible}
      reset={reset}
      selectedCoach={selectedCoach}
      removeCoach={removeCoach}
      selectedSource={selectedSource}
      removeSource={removeSource}
      selectedDestination={selectedDestination}
      removeDestination={removeDestination}
      selectedArrivalTime={selectedArrivalTime}
      removeArrivalTime={removeArrivalTime}
      selectedDepartureTime={selectedDepartureTime}
      removeDepartureTime={removeDepartureTime}
      addCoach={addCoach}
      coaches={coaches}
      addSource={addSource}
      sources={sources}
      addDestination={addDestination}
      destinations={destinations}
      addArrivalTime={addArrivalTime}
      arrivalTimes={arrivalTimes}
      addDepartureTime={addDepartureTime}
      departureTimes={departureTimes}
      maxFare={maxFare}
      setSliderValue={setSliderValue}
      sliderValue={sliderValue}
    />
  );
}

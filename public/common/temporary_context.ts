import { createContext } from "react";

export interface Day {
    day: string;
    month: string;
    year: string;
}


export interface SchedulingContextType {
    startingLocation: string;
    setStartingLocation: (startingLocation: string) => void;
    destinations: string[];
    setDestinations: (destinations: string[]) => void;
    startingDate: Day;
    setStartingDate: (startingDate: Day) => void;
    endingDate: Day;
    setEndingDate: (endingDate: Day) => void;
}

export const SchedulingContext = createContext<SchedulingContextType | null>(null);



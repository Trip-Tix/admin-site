import { createContext } from "react";

interface BusInfoContextType {
  busId: string;
  setBusId: (busId: string) => void;
  coachId: string;
  setCoachId: (coachId: string) => void;
}

export const BusInfoContext = createContext<BusInfoContextType | null>(null);

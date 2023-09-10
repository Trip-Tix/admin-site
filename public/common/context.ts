import { createContext } from "react";
import { class_interface } from "./flight_interfaces";
import { locationInfo as TrainLocationInfo } from "./train_interfaces";
import { locationInfo as FlightLocationInfo } from "./flight_interfaces";

export interface BusInfoContextType {
  coachId: number;
  setCoachId: (coachId: number) => void;
  coachName: string;
  setCoachName: (coachName: string) => void;
  brandName: string;
  setBrandName: (brandName: string) => void;
  layout: number[][];
  setLayout: (layout: number[][]) => void;
  numSeat: number;
  setNumSeat: (numSeat: number) => void;
  busLayoutId: number;
  setBusLayoutId: (busLayoutId: number) => void;
  numBus: number;
  setNumBus: (numBus: number) => void;
  facilities: string[];
  setFacilities: (facilities: string[]) => void;
}

export const BusInfoContext = createContext<BusInfoContextType | null>(null);

export interface TrainInfoContextType {
  uniqueTrainId: string;
  setUniqueTrainId: (uniqueTrainId: string) => void;
  coachNames: string[];
  setCoachNames: (coachNames: string[]) => void;
  coachIds: number[];
  setCoachIds: (coachIds: number[]) => void;
  layout: number[][][];
  setLayout: (layout: number[][][]) => void;
  numSeat: number[];
  setNumSeat: (numSeat: number[]) => void;
  trainLayoutId: number[];
  setTrainLayoutId: (trainLayoutId: number[]) => void;
  facilities: string[];
  setFacilities: (facilities: string[]) => void;
  status: number;
  setStatus: (status: number) => void;
}

export const TrainInfoContext = createContext<TrainInfoContextType | null>(null);

export interface FlightInfoContextType {
  uniqueFlightId: string;
  setUniqueFlightId: (uniqueFlightId: string) => void;
  classNames: string[];
  setClassNames: (classNames: string[]) => void;
  classIds: number[];
  setClassIds: (classIds: number[]) => void;
  layout: number[][][];
  setLayout: (layout: number[][][]) => void;
  numSeat: number[];
  setNumSeat: (numSeat: number[]) => void;
  flightLayoutId: number[];
  setFlightLayoutId: (flightLayoutId: number[]) => void;
  numTotalSeats: number;
  setNumTotalSeats: (numTotalSeats: number) => void;
  facilities: string[];
  setFacilities: (facilities: string[]) => void;
  status: number;
  setStatus: (status: number) => void;
}

export const FlightInfoContext = createContext<FlightInfoContextType | null>(null);

export interface UserInfoContextType {
  username: string;
  setUsername: (username: string) => void;
  userToken: string;
  setUserToken: (usertoken: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const UserInfoContext = createContext<UserInfoContextType | null>(null);

export interface CoachInfo {
  coachName: string;
  availableNumber: number;
  row: number;
  column: number;
  layout: number[][];
  availableSeat: number;
}
export interface ClassInfo {
  className: string;
  availableNumber: number;
  row: number;
  column: number;
  layout: number[][];
  availableSeat: number;
}

export interface BusAddContextType {
  busName: string;
  setBusName: (busName: string) => void;
  coaches: CoachInfo[];
  setCoaches: (coaches: CoachInfo[]) => void;
  submit: boolean;
  setSubmit: (submit: boolean) => void;
  check: boolean;
  setCheck: (check: boolean) => void;
}

export const BusAddContext = createContext<BusAddContextType | null>(null);

export interface TrainAddContextType {
  trainName: string;
  setTrainName: (trainName: string) => void;
  coaches: CoachInfo[];
  setCoaches: (coaches: CoachInfo[]) => void;
  submit: boolean;
  setSubmit: (submit: boolean) => void;
  check: boolean;
  setCheck: (check: boolean) => void;
}

export const TrainAddContext = createContext<TrainAddContextType | null>(null);


export interface CoachInfoContextType {
  coachName: string;
  setCoachName: (coachName: string) => void;
  availableNumber: number;
  setAvailableNumber: (availableNumber: number) => void;
  row: number;
  setRow: (row: number) => void;
  column: number;
  setColumn: (column: number) => void;
  layout: number[][];
  setLayout: (layout: number[][]) => void;
  availableSeat: number;
  setAvailableSeat: (availableSeat: number) => void;
}

export const CoachInfoContext = createContext<CoachInfoContextType | null>(
  null
);


export interface FlightAddContextType {
  flightName: string;
  setFlightName: (flightName: string) => void;
  classes: ClassInfo[];
  setClasses: (classes: ClassInfo[]) => void;
  submit: boolean;
  setSubmit: (submit: boolean) => void;
  check: boolean;
  setCheck: (check: boolean) => void;
}

export const FlightAddContext = createContext<FlightAddContextType | null>(null);


export interface ClassInfoContextType {
  className: string;
  setClassName: (className: string) => void;
  availableNumber: number;
  setAvailableNumber: (availableNumber: number) => void;
  row: number;
  setRow: (row: number) => void;
  column: number;
  setColumn: (column: number) => void;
  layout: number[][];
  setLayout: (layout: number[][]) => void;
  availableSeat: number;
  setAvailableSeat: (availableSeat: number) => void;
}

export const ClassInfoContext = createContext<ClassInfoContextType | null>(
  null
);

export interface Day {
  day: number;
  month: number;
  year: number;
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


export interface AirSchedulingContextType {
  startingLocation: number;
  setStartingLocation: (startingLocation: number) => void;
  destinationLocation: number;
  setDestinationLocation: (destinationLocation: number) => void;
  startingDate: Day;
  setStartingDate: (startingDate: Day) => void;
  endingDate: Day;
  setEndingDate: (endingDate: Day) => void;
}

export const AirSchedulingContext = createContext<AirSchedulingContextType | null>(null);

export interface TrainSchedulingContextType {
  startingLocation: TrainLocationInfo;
  setStartingLocation: (startingLocation: TrainLocationInfo) => void;
  destinations: TrainLocationInfo[];
  setDestinations: (destinations: TrainLocationInfo[]) => void;
  startingDate: Day;
  setStartingDate: (startingDate: Day) => void;
  endingDate: Day;
  setEndingDate: (endingDate: Day) => void;
}

export const TrainSchedulingContext = createContext<TrainSchedulingContextType | null>(null);

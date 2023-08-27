import { createContext } from "react";

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
}

export const BusInfoContext = createContext<BusInfoContextType | null>(null);

export interface TrainInfoContextType {
  trainId: string;
  setTrainId: (trainId: string) => void;
  coachId: string;
  setCoachId: (coachId: string) => void;
}


export const TrainInfoContext = createContext<TrainInfoContextType | null>(null);

export interface FlightInfoContextType {
  flightId: string;
  setFlightId: (flightId: string) => void;
  classId: string;
  setClassId: (classId: string) => void;
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
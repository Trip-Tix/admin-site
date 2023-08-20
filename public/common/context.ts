import { createContext } from "react";

export interface BusInfoContextType {
  busId: string;
  setBusId: (busId: string) => void;
  coachId: string;
  setCoachId: (coachId: string) => void;
}

export const BusInfoContext = createContext<BusInfoContextType | null>(null);

export interface TrainInfoContextType {
  trainId: string;
  setTrainId: (trainId: string) => void;
  coachId: string;
  setCoachId: (coachId: string) => void;
}


export const TrainInfoContext = createContext<TrainInfoContextType | null>(null);

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
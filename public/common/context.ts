import { createContext } from "react";

interface BusInfoContextType {
  busId: string;
  setBusId: (busId: string) => void;
  coachId: string;
  setCoachId: (coachId: string) => void;
}

export const BusInfoContext = createContext<BusInfoContextType | null>(null);

interface UserInfoContextType {
  username: string;
  setUsername: (username: string) => void;
  userToken: string;
  setUserToken: (usertoken: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const UserInfoContext = createContext<UserInfoContextType | null>(null);
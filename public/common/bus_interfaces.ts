export interface coach {
  coachId: number;
  coachName: string;
}

export interface coachBrands {
  coachId: number;
  coachName: string;
  brandList: string[];
}

export interface brandData {
  layout: number[][];
  numBus: number;
}

export interface busInfo {
  coachId : number,
  brandName : string,
  alreadyExist : boolean,
  numBus: number,
  uniqueBusId : string[],
  numSeat: number,
  layout: number[][],
  row: number,
  col: number
}

export interface ScheduleEntry {
  key: number;
  date: string;
  time: string;
  fare: number;
  uniqueBusId: string;
}
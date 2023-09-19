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
  col: number,
  facilities: string[],
}

export interface ScheduleEntry {
  key: number;
  date: string;
  time: string;
  fare: number[];
  uniqueBusId: string;
}

export interface coachBrandEntry {
  coachId: number;
  coachName: string;
  brandName: string;
  layout: number[][];
  numSeat: number;
  numBus: number;
  busLayoutId: number;
  facilities: string[];
}

export interface UniqueBusScheduleInfoResponse {
  bus_schedule_id: string;
  starting_point: string;
  ending_point: string;
  destination_points: string[];
  departure_time: string;
  bus_fare: number[];
  schedule_date: string;
  bookedCount: string;
  totalCount: string;
}

export interface uniqueBusEntryInfo {
  uniqueBusId: string;
  status: number;
}
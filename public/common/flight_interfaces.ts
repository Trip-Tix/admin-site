export interface class_interface {
  classId: number;
  className: string;
}

export interface classBrands {
  classId: number;
  className: string;
  brandList: string[];
}

export interface layoutData {
  layout: number[][],
}

export interface flightInfo {
  classId : number,
  numFlight: number,
  uniqueFlightId : string[],
  numSeat: number,
  layout: number[][],
  row: number,
  col: number
}

export interface ScheduleEntry {
  key: number;
  date: string;
  time: string;
  fare: number[];
  uniqueFlightId: string;
}

export interface classBrandEntry {
  classId: number;
  className: string;
  brandName: string;
  layout: number[][];
  numSeat: number;
  numFlight: number;
  flightLayoutId: number;
}

export interface UniqueFlightScheduleInfoResponse {
  flight_schedule_id: string;
  starting_point: string;
  ending_point: string;
  destination_points: string[];
  departure_time: string;
  flight_fare: number[];
  schedule_date: string;
  bookedCount: string;
  totalCount: string;
}

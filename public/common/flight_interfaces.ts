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
  row: number,
  col: number,
  numSeat: number,
}

export interface flightInfo {
  classes : class_interface[],
  numFlight: number,
  uniqueFlightId : string[],
  numSeats: number[],
  layouts: number[][][],
  rows: number[],
  cols: number[],
  facilities: string[],
}

export interface ScheduleEntry {
  key: number;
  date: string;
  time: string;
  fare: number[];
  uniqueFlightId: string;
}

export interface uniqueFlightEntry {
  uniqueFlightId: string;
  classNames: string[];
  classIds: number[];
  layout: number[][][];
  numSeat: number[];
  flightLayoutId: number[];
  numTotalSeats: number;
  facilities: string[];
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

export interface locationInfo {
  location_id: number;
  location_name: string;
  country_name: string;
  location_code: string;
  airport_name: string;
}
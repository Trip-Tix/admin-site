export interface coach {
    coachId: number;
    coachName: string;
  }
  
  export interface layoutData {
    layout: number[][],
    row: number,
    col: number,
    numSeat: number,
  }
  
  export interface trainInfo {
    coaches : coach[],
    numTrain: number,
    uniqueTrainId : string[],
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
    uniqueTrainId: string;
  }
  
  export interface coachBrandEntry {
    coachId: number;
    coachName: string;
    brandName: string;
    layout: number[][];
    numSeat: number;
    numTrain: number;
    flightLayoutId: number;
  }
  
  export interface UniqueTrainScheduleInfoResponse {
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
  
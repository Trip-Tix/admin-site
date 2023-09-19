export interface coach_interface {
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
    coaches : coach_interface[],
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
    coachIds: number[];
    fare: number[][];
    numOfCoaches: number[];
    uniqueTrainId: string;
  }
  
  export interface UniqueTrainScheduleInfoResponse {
    train_schedule_id: string;
    starting_point: string;
    ending_point: string;
    destination_points: string[];
    departure_time: string;
    train_fare: number[];
    schedule_date: string;
    bookedCount: string;
    totalCount: string;
  }
  
  export interface uniqueTrainEntry {
    uniqueTrainId: string;
    coachNames: string[];
    coachIds: number[];
    layout: number[][][];
    numSeat: number[];
    trainLayoutId: number[];
    numTotalSeats: number;
    facilities: string[];
    status: number;
  }
  
  
export interface locationInfo {
  location_id: number;
  location_name: string;
  station_name: string;
}

export interface scheduleTrainReturnType {
  unique_train_id: string;
  coach_info: number[];
  coach_names: string[];
  number_of_seats: number[];
}

export interface scheduleCoach {
  [coachId: string]: {
    fare: number[];
    numberOfCoach: number;
  };
}

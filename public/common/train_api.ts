import axios from "axios";

export const main_url = process.env.NEXT_PUBLIC_MAIN_URL;

// for admin user
export const postLogin = main_url + "/api/admin/login";

// for train
export const getAllTrain = main_url + "/api/admin/getAllTrain";
export const postAddTrain = main_url + "/api/admin/addTrainInfo";
export const getTrainNames = main_url + "/api/admin/getTrainNames";
export const getAllCoachesTrain = main_url + "/api/admin/getTrainCoachInfo";

export const getUniqueTrainScheduleInfo = main_url + "/api/admin/getUniqueTrainScheduleInfo";
export const getAllUniqueTrainCount = main_url + "/api/admin/getAllUniqueTrainCount";

// get all coaches list
const getAllCoaches = main_url + "/api/admin/getTrainCoachInfo";
import { coach_interface, scheduleCoach } from "@public/common/train_interfaces";
interface getAllCoachesResponse {
  coach_id: number;
  coach_name: string;
}
export const fetchCoachList = async (): Promise<coach_interface[]> => {
  try {
    const response = await axios.post(getAllCoaches, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("coach list fetched");
      const tempCoachList: coach_interface[] = response.data.map(
        (coach_: getAllCoachesResponse) => ({
          coachId: coach_.coach_id,
          coachName: coach_.coach_name,
        }),
      );
      return tempCoachList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// get layout of a coach
export const getTrainLayout = main_url + "/api/admin/getTrainLayout";
import { layoutData } from "@public/common/train_interfaces";

export const fetchTrainLayout = async (
  coachId: number,
): Promise<layoutData> => {
  try {
    const response = await axios.post(
      getTrainLayout,
      {
        coachId: coachId,
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("layout fetched");
      const tempLayout: layoutData = {
        layout: Array.isArray(response.data.layout) ? response.data.layout : [],
        row: response.data.row,
        col: response.data.col,
        numSeat: response.data.number_of_seats,
      };

      return tempLayout;
    } else {
      console.log(response.data.message);
      return {
        layout: [],
        row: 0,
        col: 0,
        numSeat: 0,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      layout: [],
      row: 0,
      col: 0,
      numSeat: 0,
    };
  }
};


// get existing train ids list given coach id and brand name
const getExistingTrainIds = main_url + "/api/admin/getUniqueTrainIdList";
interface getExistingTrainIdsResponse {
  unique_train_id: string;
}

export const fetchExistingTrainIds = async (): Promise<string[]> => {
  try {
    const response = await axios.post(
      getExistingTrainIds,
      null,
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("existing train ids fetched");
      const tempTrainIds: string[] = response.data.map(
        (train: getExistingTrainIdsResponse) => train.unique_train_id,
      );
      return tempTrainIds;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};


// add new train
const addTrain = main_url + "/api/admin/addTrainInfofam";
import { trainInfo } from "@public/common/train_interfaces";
interface addTrainResponse {
  message: string;
}

export const addNewTrain = async (trainInfo: trainInfo): Promise<string> => {
  console.log("add new train");
  console.log({
    coaches: trainInfo.coaches.map((coach) => coach.coachId),
    numTrain: trainInfo.numTrain,
    uniqueTrainId: trainInfo.uniqueTrainId,
    numSeats: trainInfo.numSeats,
    layouts: trainInfo.layouts,
    rows: trainInfo.rows,
    cols: trainInfo.cols,
    facilities: trainInfo.facilities,
  });
  try {
    const response = await axios.post(
      addTrain,
      {
        coaches: trainInfo.coaches.map((coach) => coach.coachId),
        numTrain: trainInfo.numTrain,
        uniqueTrainId: trainInfo.uniqueTrainId,
        numSeats: trainInfo.numSeats,
        layouts: trainInfo.layouts,
        rows: trainInfo.rows,
        cols: trainInfo.cols,
        facilities: trainInfo.facilities,
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("new train added");
      return response.data.message;
    } else {
      console.log(response.data.message);
      return response.data.message;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};


// get all train to list
const getAllTrainToList = main_url + "/api/admin/getTrainInfo";
interface getAllTrainToListResponse {
  unique_train_id: string;
  coach_names: string[];
  coach_ids: number[];
  layouts: number[][][];
  layoutIds: number[];
  eachNumOfSeats: number[];
  facilities: string[];
}

import { uniqueTrainEntry } from "@public/common/train_interfaces";
export const fetchAllTrainToList = async (): Promise<uniqueTrainEntry[]> => {
  try {
    const response = await axios.post(getAllTrainToList, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("all train to list fetched");
      const tempTrainToList: uniqueTrainEntry[] = response.data.map(
        (train: getAllTrainToListResponse) => ({
          uniqueTrainId: train.unique_train_id,
          coachNames: train.coach_names,
          coachIds: train.coach_ids,
          layout: train.layouts,
          numSeat: train.eachNumOfSeats,
          trainLayoutId: train.layoutIds,
          facilities: train.facilities,
        }),
      );
      console.log(tempTrainToList);
      return tempTrainToList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// get available location
const getTrainLocations = main_url + "/api/admin/getTrainLocations";
import { locationInfo } from "@public/common/train_interfaces";

interface getTrainLocationsResponse {
  location_id: number;
  location_name: string;
  station_name: string;
}
export const fetchTrainLocations = async (): Promise<locationInfo[]> => {
  try {
    const response = await axios.post(getTrainLocations, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("Train locations fetched");
      const tempLocations: locationInfo[] = response.data.map(
        (location: getTrainLocationsResponse) => ({
          location_id: location.location_id,
          location_name: location.location_name,
          station_name: location.station_name,
        }),
      );
      return tempLocations;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};



//fetch all the unique trains
const getAllAvailableTrain = main_url + "/api/admin/getAvailableTrain";
import { scheduleTrainReturnType } from "@public/common/train_interfaces";
interface getAllUniqueTrainResponse {
  unique_train_id : string;
  coach_info: number[],
  coach_names: string[],
  number_of_seats: number[],
}
export const fetchAllAvailableTrain = async (
  date: string,
): Promise<scheduleTrainReturnType[]> => {
  try {
    const response = await axios.post(
      getAllAvailableTrain,
      {
        date: date,
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("all available train fetched");
      const tempAvailableTrain: scheduleTrainReturnType[] = [];
      console.log(response);
      response.data.map((train: getAllUniqueTrainResponse) =>
        tempAvailableTrain.push( {
          unique_train_id: train.unique_train_id,
          coach_info: train.coach_info,
          coach_names: train.coach_names,
          number_of_seats: train.number_of_seats,
        }),
      );
      console.log(tempAvailableTrain);
      return tempAvailableTrain;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};



// send all the schedule info to the backend
const postSchedule = main_url + "/api/admin/addTrainScheduleInfo";
interface postRequest {
  src: number;
  dest: number;
  destPoints: number[];
  date: string;
  schedule: scheduleCoach[];
}
export const postScheduleInfo = async ({
  src,
  dest,
  destPoints,
  date,
  schedule,
}: postRequest): Promise<string> => {
  try {
    console.log("post schedule info");
    console.log({
      src: src,
      dest: dest,
      destPoints: destPoints,
      date: date,
      schedule: schedule,
    });
    const response = await axios.post(
      postSchedule,
      {
        src: src,
        dest: dest,
        destPoints: destPoints,
        date: date,
        schedule: schedule,
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("schedule added");
      return response.data.message;
    } else {
      console.log(response.data.message);
      return response.data.message;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};



// train checkpoint

// checkpoint



// get all unique train id list from coach id and brand name
const getAllUniqueTrainId = main_url + "/api/admin/getAllUniqueTrain";
interface getAllUniqueTrainIdResponse {
  unique_train_id: string;
}
export const fetchAllUniqueTrainId = async ({
  coachId,
  brandName,
}: {
  coachId: number;
  brandName: string;
}): Promise<string[]> => {
  try {
    const response = await axios.post(
      getAllUniqueTrainId,
      {
        coachId: coachId,
        brandName: brandName,
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("unique train id list fetched");
      const tempUniqueTrainIdList: string[] = response.data.map(
        (train: getAllUniqueTrainIdResponse) => train.unique_train_id,
      );
      return tempUniqueTrainIdList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

import { UniqueTrainScheduleInfoResponse } from "@public/common/train_interfaces";
export const fetchUniqueTrainSchedule = async (uniqueTrainId: string): Promise<UniqueTrainScheduleInfoResponse[]> => {
  try {
    const response = await axios.post(
      getUniqueTrainScheduleInfo,
      {
        uniqueTrainId: uniqueTrainId
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      }
    );

    if (response.status === 200) {
      console.log("Unique train schedules fetched");
      return response.data;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};


// Function to fetch the count of all unique trains
export const fetchAllUniqueTrainCount = async (): Promise<number> => {
  try {
    const response = await axios.post(
      getAllUniqueTrainCount, null,
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      }
    );

    if (response.status === 200) {
      console.log("Unique train count fetched:", response.data.count);
      return response.data.totalUniqueTraines;
    
    } else {
      console.log(response.data.message);
      return 0;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};

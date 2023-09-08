import axios from "axios";

export const main_url = process.env.NEXT_PUBLIC_MAIN_URL;

// for admin user
export const postLogin = main_url + "/api/admin/login";

// for flight
export const getAllFlight = main_url + "/api/admin/getAllFlight";
export const postAddFlight = main_url + "/api/admin/addFlightInfo";
export const getFlightNames = main_url + "/api/admin/getFlightNames";
export const getAllClassesFlight = main_url + "/api/admin/getFlightClassInfo";

export const getUniqueFlightScheduleInfo = main_url + "/api/admin/getUniqueFlightScheduleInfo";
export const getAllUniqueFlightCount = main_url + "/api/admin/getAllUniqueFlightCount";

// get all classes list
const getAllClasses = main_url + "/api/admin/getAirClassInfo";
import { class_interface } from "@public/common/flight_interfaces";
interface getAllClassesResponse {
  class_id: number;
  class_name: string;
}
export const fetchClassList = async (): Promise<class_interface[]> => {
  try {
    const response = await axios.post(getAllClasses, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("class list fetched");
      const tempClassList: class_interface[] = response.data.map(
        (class_: getAllClassesResponse) => ({
          classId: class_.class_id,
          className: class_.class_name,
        }),
      );
      return tempClassList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};


// get layout of a class
export const getFlightLayout = main_url + "/api/admin/getFlightLayout";
import { layoutData } from "@public/common/flight_interfaces";

export const fetchFlightLayout = async (
  classId: number,
): Promise<layoutData> => {
  try {
    const response = await axios.post(
      getFlightLayout,
      {
        classId: classId,
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

// get existing flight ids list given class id and brand name
const getExistingFlightIds = main_url + "/api/admin/getUniqueFlightIdList";
interface getExistingFlightIdsResponse {
  unique_air_id: string;
}

export const fetchExistingFlightIds = async (): Promise<string[]> => {
  try {
    const response = await axios.post(
      getExistingFlightIds,
      null,
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("existing flight ids fetched");
      const tempFlightIds: string[] = response.data.map(
        (flight: getExistingFlightIdsResponse) => flight.unique_air_id,
      );
      return tempFlightIds;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// add new flight
const addFlight = main_url + "/api/admin/addFlightInfo";
import { flightInfo } from "@public/common/flight_interfaces";
interface addFlightResponse {
  message: string;
}

export const addNewFlight = async (flightInfo: flightInfo): Promise<string> => {
  console.log("add new flight");
  console.log(flightInfo);
  try {
    const response = await axios.post(
      addFlight,
      {
        classes: flightInfo.classes,
        numFlight: flightInfo.numFlight,
        uniqueFlightId: flightInfo.uniqueFlightId,
        numSeats: flightInfo.numSeats,
        layouts: flightInfo.layouts,
        rows: flightInfo.rows,
        cols: flightInfo.cols,
        facilities: flightInfo.facilities,
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("new flight added");
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


// checkpoint

// get available location
const getLocations = main_url + "/api/admin/getLocation";
interface getLocationsResponse {
  location_id: number;
  location_name: string;
}
export const fetchLocations = async (): Promise<string[]> => {
  try {
    const response = await axios.post(getLocations, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("locations fetched");
      const tempLocations: string[] = response.data.map(
        (location: getLocationsResponse) => location.location_name,
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

//fetch all the unique flights
const getAllAvailableFlight = main_url + "/api/admin/getAvailableFlight";
interface getAllUniqueFlightResponse {
  unique_flight_id: string;
}
export const fetchAllAvailableFlight = async (
  date: string,
  time: string,
  classId: number,
  brandName: string,
): Promise<string[]> => {
  try {
    const response = await axios.post(
      getAllAvailableFlight,
      {
        date: date,
        time: time,
        classId: classId,
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
      console.log("all available flight fetched");
      const tempAvailableFlight: string[] = [];
      response.data.uniqueFlightId.map((flight: getAllUniqueFlightResponse) =>
        tempAvailableFlight.push(flight.unique_flight_id),
      );
      return tempAvailableFlight;
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
const postSchedule = main_url + "/api/admin/addFlightScheduleInfo";
interface postRequest {
  src: string;
  dest: string[];
  date: string;
  schedule: {
    time: string;
    fare: number[];
    uniqueFlightId: string;
  }[];
}
export const postScheduleInfo = async ({
  src,
  dest,
  date,
  schedule,
}: postRequest): Promise<string> => {
  try {
    console.log("post schedule info");
    console.log({
      src: src,
      dest: dest[dest.length - 1],
      destPoints: dest,
      date: date,
      schedule: schedule,
    });
    const response = await axios.post(
      postSchedule,
      {
        src: src,
        dest: dest[dest.length - 1],
        destPoints: dest,
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

// get all flight to list
const getAllFlightToList = main_url + "/api/admin/getFlightInfo";
interface getAllFlightToListResponse {
  flight_class_id: number;
  number_of_flight: number;
  brand_name: string;
  class_name: string;
  class_id: number;
  flight_layout_id: number;
  number_of_seats: number;
  row: number;
  col: number;
  layout: number[][];
}
import { classBrandEntry } from "@public/common/flight_interfaces";
export const fetchAllFlightToList = async (): Promise<classBrandEntry[]> => {
  try {
    const response = await axios.post(getAllFlightToList, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("all flight to list fetched");
      const tempFlightToList: classBrandEntry[] = response.data.map(
        (flight: getAllFlightToListResponse) => ({
          classId: flight.class_id,
          className: flight.class_name,
          brandName: flight.brand_name,
          layout: flight.layout,
          numSeat: flight.number_of_seats,
          numFlight: flight.number_of_flight,
          flightLayoutId: flight.flight_layout_id,
        }),
      );
      return tempFlightToList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// get all unique flight id list from class id and brand name
const getAllUniqueFlightId = main_url + "/api/admin/getAllUniqueFlight";
interface getAllUniqueFlightIdResponse {
  unique_flight_id: string;
}
export const fetchAllUniqueFlightId = async ({
  classId,
  brandName,
}: {
  classId: number;
  brandName: string;
}): Promise<string[]> => {
  try {
    const response = await axios.post(
      getAllUniqueFlightId,
      {
        classId: classId,
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
      console.log("unique flight id list fetched");
      const tempUniqueFlightIdList: string[] = response.data.map(
        (flight: getAllUniqueFlightIdResponse) => flight.unique_flight_id,
      );
      return tempUniqueFlightIdList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

import { UniqueFlightScheduleInfoResponse } from "@public/common/flight_interfaces";
export const fetchUniqueFlightSchedule = async (uniqueFlightId: string): Promise<UniqueFlightScheduleInfoResponse[]> => {
  try {
    const response = await axios.post(
      getUniqueFlightScheduleInfo,
      {
        uniqueFlightId: uniqueFlightId
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      }
    );

    if (response.status === 200) {
      console.log("Unique flight schedules fetched");
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


// Function to fetch the count of all unique flights
export const fetchAllUniqueFlightCount = async (): Promise<number> => {
  try {
    const response = await axios.post(
      getAllUniqueFlightCount, null,
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      }
    );

    if (response.status === 200) {
      console.log("Unique flight count fetched:", response.data.count);
      return response.data.totalUniqueFlightes;
    
    } else {
      console.log(response.data.message);
      return 0;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};

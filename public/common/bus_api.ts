import axios from "axios";

export const main_url = process.env.NEXT_PUBLIC_MAIN_URL;

// for admin user
export const postLogin = main_url + "/api/admin/login";

// for bus
export const getAllBus = main_url + "/api/admin/getAllBus";
export const postAddBus = main_url + "/api/admin/addBusInfo";
export const getBusNames = main_url + "/api/admin/getBusNames";
export const getAllCoachesBus = main_url + "/api/admin/getBusCoachInfo";

export const getUniqueBusScheduleInfo = main_url + "/api/admin/getUniqueBusScheduleInfo";
export const getAllUniqueBusCount = main_url + "/api/admin/getAllUniqueBusCount";

// export const postLogin = '/api/user/login'
// export const getAllBus = '/api/bus/get-all-bus'
// export const getBusLayout = '/api/bus/get-layout'

/*
 *
 *  Bus
 *
 */

// get all coaches list
const getAllCoaches = main_url + "/api/admin/getBusCoachInfo";
import { coach } from "@public/common/bus_interfaces";
interface getAllCoachesResponse {
  coach_id: number;
  coach_name: string;
}
export const fetchCoachList = async (): Promise<coach[]> => {
  try {
    const response = await axios.post(getAllCoaches, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("coach list fetched");
      const tempCoachList: coach[] = response.data.map(
        (coach: getAllCoachesResponse) => ({
          coachId: coach.coach_id,
          coachName: coach.coach_name,
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

// get all coachBrand list
const getAllCoachBrand = main_url + "/api/admin/getBrandInfo";
import { coachBrands } from "@public/common/bus_interfaces";
interface getAllCoachBrandResponse {
  coachId: number;
  coachName: string;
  brandList: string[];
}

export const fetchCoachBrandList = async (): Promise<coachBrands[]> => {
  try {
    const response = await axios.post(getAllCoachBrand, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("coach brand list fetched");
      const tempCoachBrandList: coachBrands[] = response.data.map(
        (coach: getAllCoachBrandResponse) => ({
          coachId: coach.coachId,
          coachName: coach.coachName,
          brandList: coach.brandList,
        }),
      );
      return tempCoachBrandList;
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
export const getBusLayout = main_url + "/api/admin/getBusLayout";
import { brandData } from "@public/common/bus_interfaces";
import exp from "constants";
interface getBusLayoutResponse {
  layout: number[][];
  existingNumBus: number;
}

export const fetchBusLayout = async (
  coachId: number,
  brandName: string,
): Promise<brandData> => {
  try {
    const response = await axios.post(
      getBusLayout,
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
      console.log("layout fetched");
      const tempLayout: brandData = {
        layout: response.data.layout,
        numBus: response.data.number_of_bus,
      };
      return tempLayout;
    } else {
      console.log(response.data.message);
      return {
        layout: [],
        numBus: 0,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      layout: [],
      numBus: 0,
    };
  }
};

// get existing bus ids list given coach id and brand name
const getExistingBusIds = main_url + "/api/admin/getUniqueBusIdList";
interface getExistingBusIdsResponse {
  unique_bus_id: string;
}

export const fetchExistingBusIds = async (
  coachId: number,
  brandName: string,
): Promise<string[]> => {
  try {
    const response = await axios.post(
      getExistingBusIds,
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
      console.log("existing bus ids fetched");
      const tempBusIds: string[] = response.data.map(
        (bus: getExistingBusIdsResponse) => bus.unique_bus_id,
      );
      return tempBusIds;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// add new bus
const addBus = main_url + "/api/admin/addBusInfo";
import { busInfo } from "@public/common/bus_interfaces";
interface addBusResponse {
  message: string;
}

export const addNewBus = async (busInfo: busInfo): Promise<string> => {
  console.log("add new bus");
  console.log(busInfo);
  try {
    const response = await axios.post(
      addBus,
      {
        coachId: busInfo.coachId,
        brandName: busInfo.brandName,
        alreadyExist: busInfo.alreadyExist,
        numBus: busInfo.numBus,
        uniqueBusId: busInfo.uniqueBusId,
        numSeat: busInfo.numSeat,
        layout: busInfo.layout,
        row: busInfo.row,
        col: busInfo.col,
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      },
    );

    if (response.status === 200) {
      console.log("new bus added");
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

//fetch all the unique buses
const getAllAvailableBus = main_url + "/api/admin/getAvailableBus";
interface getAllUniqueBusResponse {
  unique_bus_id: string;
}
export const fetchAllAvailableBus = async (
  date: string,
  time: string,
  coachId: number,
  brandName: string,
): Promise<string[]> => {
  try {
    const response = await axios.post(
      getAllAvailableBus,
      {
        date: date,
        time: time,
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
      console.log("all available bus fetched");
      const tempAvailableBus: string[] = [];
      response.data.uniqueBusId.map((bus: getAllUniqueBusResponse) =>
        tempAvailableBus.push(bus.unique_bus_id),
      );
      return tempAvailableBus;
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
const postSchedule = main_url + "/api/admin/addBusScheduleInfo";
interface postRequest {
  src: string;
  dest: string[];
  date: string;
  schedule: {
    time: string;
    fare: number[];
    uniqueBusId: string;
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

// get all bus to list
const getAllBusToList = main_url + "/api/admin/getBusInfo";
interface getAllBusToListResponse {
  bus_coach_id: number;
  number_of_bus: number;
  brand_name: string;
  coach_name: string;
  coach_id: number;
  bus_layout_id: number;
  number_of_seats: number;
  row: number;
  col: number;
  layout: number[][];
}
import { coachBrandEntry } from "@public/common/bus_interfaces";
export const fetchAllBusToList = async (): Promise<coachBrandEntry[]> => {
  try {
    const response = await axios.post(getAllBusToList, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
        companyname: sessionStorage.getItem("company-name"),
      },
    });

    if (response.status === 200) {
      console.log("all bus to list fetched");
      const tempBusToList: coachBrandEntry[] = response.data.map(
        (bus: getAllBusToListResponse) => ({
          coachId: bus.coach_id,
          coachName: bus.coach_name,
          brandName: bus.brand_name,
          layout: bus.layout,
          numSeat: bus.number_of_seats,
          numBus: bus.number_of_bus,
          busLayoutId: bus.bus_layout_id,
        }),
      );
      return tempBusToList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

// get all unique bus id list from coach id and brand name
const getAllUniqueBusId = main_url + "/api/admin/getAllUniqueBus";
interface getAllUniqueBusIdResponse {
  unique_bus_id: string;
}
export const fetchAllUniqueBusId = async ({
  coachId,
  brandName,
}: {
  coachId: number;
  brandName: string;
}): Promise<string[]> => {
  try {
    const response = await axios.post(
      getAllUniqueBusId,
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
      console.log("unique bus id list fetched");
      const tempUniqueBusIdList: string[] = response.data.map(
        (bus: getAllUniqueBusIdResponse) => bus.unique_bus_id,
      );
      return tempUniqueBusIdList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

import { UniqueBusScheduleInfoResponse } from "@public/common/bus_interfaces";
export const fetchUniqueBusSchedule = async (uniqueBusId: string): Promise<UniqueBusScheduleInfoResponse[]> => {
  try {
    const response = await axios.post(
      getUniqueBusScheduleInfo,
      {
        uniqueBusId: uniqueBusId
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      }
    );

    if (response.status === 200) {
      console.log("Unique bus schedules fetched");
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


// Function to fetch the count of all unique buses
export const fetchAllUniqueBusCount = async (): Promise<number> => {
  try {
    const response = await axios.post(
      getAllUniqueBusCount, null,
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
          companyname: sessionStorage.getItem("company-name"),
        },
      }
    );

    if (response.status === 200) {
      console.log("Unique bus count fetched:", response.data.count);
      return response.data.totalUniqueBuses;
    
    } else {
      console.log(response.data.message);
      return 0;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};

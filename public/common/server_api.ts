import axios from "axios";

export const main_url = process.env.NEXT_PUBLIC_MAIN_URL;

// for admin user
export const postLogin = main_url + "/api/admin/login";

// for bus
export const getAllBus = main_url + "/api/admin/getAllBus";
export const postAddBus = main_url + "/api/admin/addBusInfo";
export const getBusNames = main_url + "/api/admin/getBusNames";
export const getAllCoachesBus = main_url + "/api/admin/getBusCoachInfo";

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
const getBusLayout = main_url + "/api/admin/getBusLayout";
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
        brandName: brandName 
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
        brandName: brandName 
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
    }
    else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}


// add new bus
const addBus = main_url + "/api/admin/addBusInfo";
import { busInfo } from "@public/common/bus_interfaces";
interface addBusResponse {
  message: string;
}

export const addNewBus = async (
  busInfo: busInfo,
): Promise<string> => {
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
        col: busInfo.col
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
    }
    else {
      console.log(response.data.message);
      return response.data.message;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

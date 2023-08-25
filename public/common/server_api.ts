import axios from "axios";


export const main_url = process.env.NEXT_PUBLIC_MAIN_URL;

// for admin user
export const postLogin = main_url + "/api/admin/login";

// for bus
export const getAllBus = main_url + "/api/admin/getAllBus";
export const getBusLayout = main_url + "/api/admin/getBusLayout";
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
  coach_id: number;
  coach_name: string;
  brand_list: string[];
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
          coachId: coach.coach_id,
          coachName: coach.coach_name,
          brandList: coach.brand_list,
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
}


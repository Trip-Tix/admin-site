import axios from "axios";

export const main_url = process.env.NEXT_PUBLIC_MAIN_URL;

// get all admin to list
const getAllAdminToList = main_url + "/api/admin/allAdminInfo";
interface getAllAdminToListResponse {
  admin_id: number;
  admin_name: string;
  username: string;
  admin_role_name: string;
  status: number;
  email: string;
  company_name: string;
}

import { adminInfo } from "@public/common/admin_interface";

export const fetchAllAdminToList = async (): Promise<adminInfo[]> => {
  try {
    const response = await axios.post(getAllAdminToList, null, {
      headers: {
        token: sessionStorage.getItem("user-token"),
      },
    });

    if (response.status === 200) {
      console.log("all admin to list fetched");
      console.log(response);
      const tempAdminToList: adminInfo[] = response.data.map(
        (admin: getAllAdminToListResponse) => ({
            adminId: admin.admin_id,
            adminName: admin.admin_name,
            username: admin.username,
            adminRoleName: admin.admin_role_name,
            status: admin.status,
            email: admin.email,
            companyName: admin.company_name,
        }),
      );
      console.log(tempAdminToList);
      return tempAdminToList;
    } else {
      console.log(response.data.message);
      return [];
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};



// Update Admin Status
const updateAdminStatus = main_url + "/api/admin/statusUpdate";

interface UpdateAdminStatusRequest {
  admin_id: number;
  admin_role_name: string;
  company_name: string;
  status: number;
}

export const setAdminStatus = async ({
  admin_id,
  admin_role_name,
  company_name,
  status,
}: UpdateAdminStatusRequest): Promise<string> => {
  try {
    const response = await axios.post(
      updateAdminStatus,
      {
        adminId: admin_id,
        adminRoleName: admin_role_name,
        companyName: company_name,
        status: status,
      },
      {
        headers: {
          token: sessionStorage.getItem("user-token"),
        },
      }
    );

    if (response.status === 200) {
      console.log("Admin status updated");
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


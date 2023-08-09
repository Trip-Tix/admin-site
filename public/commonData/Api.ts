import exp from "constants";

const account_url = "https://triptix-account-service.onrender.com";

const admin_login = account_url + "/api/admin/login";
const admin_signup = account_url + "/api/admin/signup";

const main_url = "https://triptix-backend.onrender.com";

const bus_coach_add = main_url + "/api/admin/addBusCoachInfo";
const bus_layout_info_add = main_url + "/api/admin/addBusLayoutInfo";
const bus_coach_info = main_url + "/api/admin/getBusCoachInfo";
const bus_info_add = main_url + "/api/admin/getBusInfo";
const bus_schedule_info_add = main_url + "/api/admin/addBusScheduleInfo";
const get_bus_schedule_details = main_url + "/api/admin/getScheduleWiseBusDetails";

export {
  admin_login as admin_login_api,
  admin_signup as admin_signup_api,

  bus_coach_add as bus_coach_add_api,
  bus_layout_info_add as bus_layout_info_add_api,
  bus_coach_info as bus_coach_info_api,
  bus_info_add as bus_info_add_api,
  bus_schedule_info_add as bus_schedule_info_add_api,
  get_bus_schedule_details as get_bus_schedule_details_api,
};
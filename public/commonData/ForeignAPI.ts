const main_url = "https://triptix-backend.onrender.com";
// const account_url = "https://triptix-account-service.onrender.com";


const admin_login = main_url + "/api/admin/login";
const admin_signup = main_url + "/api/admin/signup";

const get_coach_info = main_url + "/api/admin/getCoachInfo";
const get_schedule_wise_bus_info = main_url + "/api/admin/getScheduleWiseBusDetails";

export {
  admin_login as admin_login_api_url,
  admin_signup as admin_signup_api_url,

  get_coach_info as get_coach_info_url,
  get_schedule_wise_bus_info as get_schedule_wise_bus_info_url,
};

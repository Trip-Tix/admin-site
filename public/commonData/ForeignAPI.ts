const account_url = "https://triptix-account-service.onrender.com";

const admin_login = account_url + "/api/admin/login";
const admin_signup = account_url + "/api/admin/signup";

const get_coach_info =
  "https://triptix-backend.onrender.com/api/admin/getCoachInfo";

const get_schedule_wise_bus_info =
  "https://triptix-backend.onrender.com/api/admin/getScheduleWiseBusDetails";

export {
  admin_login as admin_login_api,
  admin_signup as admin_signup_api,

  get_coach_info as get_coach_info_url,
  get_schedule_wise_bus_info as get_schedule_wise_bus_info_url,
};

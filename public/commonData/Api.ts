const account_url = "localhost:3000";
const admin_login = account_url + "/api/admin/login";
const admin_signup = account_url + "/api/admin/signup";

const triptix_backend = 'https://triptix-backend.onrender.com'
const triptix_bus_debug = 'https://triptix-bus-service.onrender.com'

const main_url = 'localhost:3000';
const add_coach_info = main_url + '/api/coach/addCoachInfo';
const add_bus_layout_info =  '/api/admin/addBusLayoutInfo';
const get_coach_info = triptix_bus_debug + '/api/admin/getCoachInfo';
const add_bus_info = triptix_bus_debug + '/api/admin/addBusInfo';
const get_bus_info = triptix_backend + '/api/admin/getScheduleWiseBusDetails';


export {
  admin_login as admin_login_url,
  admin_signup as admin_signup_url,
  add_coach_info as add_coach_info_url,
  add_bus_layout_info as add_bus_layout_info_url,
  get_coach_info as get_coach_info_url,
  add_bus_info as add_bus_info_url,
  get_bus_info as get_bus_info_url,
};

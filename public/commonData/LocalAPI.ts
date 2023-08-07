const localhost = "http://localhost:3000";
const get_coach_info = localhost + "/api/getCoachInfo";
const get_schedule_wise_bus_details  = localhost + "/api/getScheduleWiseBusDetails";

export { 
    get_coach_info as get_coach_info_url, 
    get_schedule_wise_bus_details as get_schedule_wise_bus_details_url
};

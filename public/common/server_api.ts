export const main_url = process.env.NEXT_PUBLIC_MAIN_URL;


// // for admin user
export const postLogin = main_url + '/api/admin/login'

// //for bus
export const getAllBus = main_url + '/api/admin/getAllBus'
export const getBusLayout = main_url + '/api/admin/getBusLayout'
export const postAddBus = main_url + '/api/admin/addBusInfo'
export const getBusNames = main_url + '/api/admin/getBusNames'
export const getAllCoachesBus = main_url + '/api/admin/getBusCoachInfo'


// export const postLogin = '/api/user/login'
// export const getAllBus = '/api/bus/get-all-bus'
// export const getBusLayout = '/api/bus/get-layout'
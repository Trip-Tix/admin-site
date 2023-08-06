import Navbar from "@components/navbar";
import DashboardFooter from "@components/dashboard_footer";
import { navbar_items } from "@public/commonData/AdminNavBarData";

export default function ShowTransportBus() {
    return (
        <>
            <Navbar selected_option={navbar_items[0]}/>
            <h1>Profile</h1>
            <DashboardFooter/>
        </>
    );
}
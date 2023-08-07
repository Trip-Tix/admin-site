import Navbar from "@components/navbar";
import DashboardFooter from "@components/dashboard_footer";
import { navbar_items } from "@public/commonData/AdminNavBarData";
import Layout from "@components/layout";

export default function ShowTransportBus() {
    return (
        <Layout title="Manage Users">
            <Navbar selected_option={navbar_items[0]}/>
            <h1>Manage Users</h1>
            <DashboardFooter/>
        </Layout>
    );
}
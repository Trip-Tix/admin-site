import Navbar from "@components/navbar";
import TransportOptionBar from "@components/transport_option_bar";
import { transport_optionbar_items } from "@public/commonData/TransportOptionBarData";
import { navbar_items, navbar_items_url} from "@public/commonData/AdminNavBarData";
import TransportMain from "@components/transport_main";
import DashboardFooter from "@components/dashboard_footer";
import Layout from "@components/layout";

export default function ShowTransportBus() {
    return (
        <Layout title="Transport Bus">
            <Navbar selected_option={navbar_items[0]}/>
            <TransportOptionBar selectedOption={transport_optionbar_items[2]}/>
            <TransportMain/>
            <DashboardFooter/>
        </Layout>
    );
}
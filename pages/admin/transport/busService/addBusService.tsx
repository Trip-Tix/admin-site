import Layout from "@components/layout";
import Navbar from "@components/navbar";
import TransportOptionBar from "@components/transport_option_bar";
import { transport_optionbar_items } from "@public/commonData/TransportOptionBarData";
import { navbar_items } from "@public/commonData/AdminNavBarData";
import DashboardFooter from "@components/dashboard_footer";
import BusServiceAdd from "@components/bus_service_add";

export default function AddBusService() {
  return (
    <Layout title="Add Bus Service">
      <Navbar selected_option={navbar_items[0]} />
      <TransportOptionBar selectedOption={transport_optionbar_items[2]} />
      <BusServiceAdd />
      <DashboardFooter />
    </Layout>
  );
}

import Layout from "@components/layout";
import Navbar from "@components/navbar";
import TransportOptionBar from "@components/transport_option_bar";
import { transport_optionbar_items } from "@public/commonData/TransportOptionBarData";
import { navbar_items } from "@public/commonData/AdminNavBarData";
import Footer from "@components/admin/footer";
import BusLayoutAdd from "@components/bus_layout_add";

export default function AddBusService() {
  return (
    <Layout title="Add Bus Service">
      <Navbar selected_option={navbar_items[0]} />
      <TransportOptionBar selectedOption={transport_optionbar_items[2]} />
      <BusLayoutAdd />
      <Footer />
    </Layout>
  );
}

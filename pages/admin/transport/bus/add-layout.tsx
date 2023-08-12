import Layout from "@components/layout";
import Navbar from "@components/shared/navbar";
import TransportOptionBar from "@components/transport_option_bar";
import { transport_optionbar_items } from "@public/commonData/TransportOptionBarData";
import { navbar_item } from "@public/commonData/AdminNavBarData";
import Footer from "@components/shared/footer";
import BusLayoutAdd from "@components/bus_layout_add";
import withAuth from "@components/auth/protectedRoute";

const AddBusLayout = () => {
  return (
    <Layout title="Add Bus Service" protectedPage={true}>
      {/* <Navbar selected_option={navbar_item[0][0]} />
      <TransportOptionBar selectedOption={transport_optionbar_items[2]} />
      <BusLayoutAdd />
      <Footer /> */}
    </Layout>
  );
}

export default withAuth(AddBusLayout);
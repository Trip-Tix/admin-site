import Navbar from "@components/shared/navbar";
import TransportOptionBar from "@components/transport_option_bar";
import { transport_optionbar_items } from "@public/commonData/TransportOptionBarData";
import {navbar_item} from "@public/commonData/AdminNavBarData";
import TransportMain from "@components/transportBusList/main";
import Footer from "@components/shared/footer";
import Layout from "@components/layout";

export default function ShowTransportBus() {
  return (
    <Layout title="Transport Bus" protectedPage={true} >
      <Navbar selected_option={navbar_item[1][0]} />
      <TransportOptionBar selectedOption={transport_optionbar_items[2]} />
      <TransportMain />
      <Footer />
    </Layout>
  );
}

import Navbar from "@components/shared/navbar";
import TransportOptionBar from "@components/transport_option_bar";
import { transport_optionbar_items } from "@public/commonData/TransportOptionBarData";
import {navbar_item} from "@public/commonData/AdminNavBarData";
import TransportMain from "@components/transportBusList/main";
import Footer from "@components/shared/footer";
import Layout from "@components/layout";
import { Flex, Spacer } from "@chakra-ui/react";

export default function ShowTransportBus() {
  return (
    <Layout title="Transport Bus" protectedPage={true} >
      <Flex direction={"column"} minH={"100vh"} >
        <Navbar selected_option={navbar_item[1][0]} />
        <TransportOptionBar selectedOption={transport_optionbar_items[2]} />
        <TransportMain />
        <Spacer />
        <Footer />
      </Flex>
    </Layout>
  );
}

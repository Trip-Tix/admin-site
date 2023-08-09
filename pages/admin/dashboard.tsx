import Navbar from "@components/shared/navbar";
import Footer from "@components/shared/footer";
import {navbar_item} from "@public/commonData/AdminNavBarData";
import Layout from "@components/layout";

export default function ShowTransportBus() {
  return (
    <Layout title="Dashboard" protectedPage={true}>
      <Navbar selected_option={navbar_item[0][0]} />
      <h1>Dashboard</h1>
      <Footer />
    </Layout>
  );
}

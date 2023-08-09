import Navbar from "@components/shared/navbar";
import Footer from "@components/shared/footer";
import {navbar_item} from "@public/commonData/AdminNavBarData";
import Layout from "@components/layout";

export default function ShowTransportBus() {
  return (
    <Layout title="Manage Users" protectedPage={true}>
      <Navbar selected_option={navbar_item[2][0]} />
      <h1>Manage Users</h1>
      <Footer />
    </Layout>
  );
}

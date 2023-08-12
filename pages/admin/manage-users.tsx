import Navbar from "@components/shared/navbar";
import Footer from "@components/shared/footer";
import { navbar_item } from "@public/commonData/AdminNavBarData";
import Layout from "@components/layout";
import { Flex, Spacer } from "@chakra-ui/react";
import { background } from "@public/commonData/Colors";
import withAuth from "@components/auth/protectedRoute";

const ManageUser = () => {
  return (
    <Layout title="Manage Users" protectedPage={true}>
      <Flex direction={"column"} minH={"100vh"} background={background}>
        <Navbar selected_option={navbar_item[2][0]} />
        <h1>Manage Users</h1>
        <Spacer />
        <Footer />
      </Flex>
    </Layout>
  );
}

export default withAuth(ManageUser);
import withAuth from "@components/auth/protectedRoute";
import Layout from "@components/layout";
import { login_url } from "@public/commonData/PageLinks";
import { use, useEffect } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";

const ShowTransportBus = () => {
  
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    router.push(login_url);
  });
  

  return (
    <Layout title="Logout" protectedPage={true}>
      <Heading as="h1" size="lg">
        Logging out...
      </Heading>
    </Layout>
  );
}

export default withAuth(ShowTransportBus);

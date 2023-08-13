import { useRouter } from "next/router";
import { manage_transports_bus_add_service_url, manage_transports_bus_list_url } from "@public/commonData/PageLinks";
import { useEffect } from "react";
import withAuth from "@components/auth/protectedRoute";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(manage_transports_bus_add_service_url);
  }, [router]);
}

export default withAuth(Home);

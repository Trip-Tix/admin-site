import { useRouter } from "next/router";
import { manage_transports_bus_list_url } from "@public/commonData/PageLinks";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(manage_transports_bus_list_url);
  }, [router]);
}

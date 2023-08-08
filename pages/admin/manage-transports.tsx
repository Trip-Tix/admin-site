import { useRouter } from "next/router";
import { manage_transports_bus_list_url } from "@public/commonData/PageLinks";

export default function Home() {
  const router = useRouter();

  if (typeof window !== "undefined") {
    router.push(manage_transports_bus_list_url);
  }

  return <h1>Redirecting</h1>;
}

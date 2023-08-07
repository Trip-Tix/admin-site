import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  // Redirect to "/user/login"
  if (typeof window !== "undefined") {
    router.push("/admin/transport/showtransportBus");
  }

  return <h1>Redirecting</h1>;
}

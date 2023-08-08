import { useRouter } from "next/router";
import { login_url } from "@public/commonData/PageLinks";

export default function Home() {
  const router = useRouter();

  // Redirect to "/user/login"
  if (typeof window !== "undefined") {
    router.push(login_url);
  }

  return <h1>Redirecting To Login</h1>;
}

import { useRouter } from "next/router";
import { login_url } from "@public/commonData/PageLinks";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // Redirect to "/user/login"
  useEffect(() => {
    router.push(login_url);
  }, []);
}

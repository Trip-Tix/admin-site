import { Box, Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { login_url, home_url } from "@public/common/pagelinks";
import { useEffect, useState } from "react";
import Head from "next/head";

interface LayoutProps {
  title: string;
  isProtected: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, isProtected, children }) => {
  const router = useRouter();
  // for protected pages
  const getLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    useEffect(() => {
      setIsLogin(sessionStorage.getItem("is-login") === "true");
    }, []);

    return isLogin;
  };
  const isLogin = getLogin();
  useEffect(() => {
    if (isProtected) {
      console.log({
        isLogin: isLogin,
        userToken: sessionStorage.getItem("user-token"),
      });
    }

    if (isProtected && !isLogin) {
      router.push(login_url);
    }
  }, [isLogin]);

  // for login page
  const getLogin_login = () => {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
      setIsLogin(sessionStorage.getItem("is-login") === "true");
    }, []);

    return isLogin;
  };
  const isLogin_login = getLogin_login();
  useEffect(() => {
    if (!isProtected) {
      console.log({
        isLogin: isLogin_login,
        userToken: sessionStorage.getItem("user-token"),
        userRole: sessionStorage.getItem("user-role"),
      });
    }

    if (!isProtected && isLogin_login) {
      router.push(home_url);
    }
  }, [isLogin_login]);

  return (
    <Box>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <main>{children}</main>
    </Box>
  );
};

export default Layout;

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
  // for protected pages
  // const [isLogin, setIsLogin] = useState(true);
  // useEffect(() => {
  //   setIsLogin(sessionStorage.getItem("is-login") === "true");
  // }, []);

  // const getLogin = () => {

  //   return isLogin;
  // };
  // const isLogin = getLogin();
  // useEffect(() => {
  //   if (isProtected) {
  //     console.log({
  //       isLogin: isLogin,
  //       userToken: sessionStorage.getItem("user-token"),
  //       userRole: sessionStorage.getItem("user-role"),
  //       userCompany: sessionStorage.getItem("company-name"),
  //     });
  //   }

  //   if (isProtected && !isLogin) {
  //     router.push(login_url);
  //   }
  // }, [isLogin]);

  // // for login page
  // const getLogin_login = () => {
  //   const [isLogin, setIsLogin] = useState(false);
  //   useEffect(() => {
  //     setIsLogin(sessionStorage.getItem("is-login") === "true");
  //   }, []);

  //   return isLogin;
  // };
  // const isLogin_login = getLogin_login();
  // useEffect(() => {
  //   if (!isProtected) {
  //     console.log({
  //       isLogin: isLogin_login,
  //       userToken: sessionStorage.getItem("user-token"),
  //       userRole: sessionStorage.getItem("user-role"),
  //       userCompany: sessionStorage.getItem("company-name"),
  //     });
  //   }

  //   if (!isProtected && isLogin_login) {
  //     router.push(home_url);
  //   }
  // }, [isLogin_login]);

  const router = useRouter();
  useEffect(() => {
    if (isProtected) {
      console.log({
        isLogin: sessionStorage.getItem("is-login") === "true",
        userToken: sessionStorage.getItem("user-token"),
        userRole: sessionStorage.getItem("user-role"),
        userCompany: sessionStorage.getItem("company-name"),
        username: sessionStorage.getItem("username"),
      });
    }

    if (isProtected && sessionStorage.getItem("is-login") !== "true") {
      router.push(login_url);
    }
  }, [isProtected, router]);

  useEffect(() => {
    if (!isProtected) {
      console.log({
        isLogin: sessionStorage.getItem("is-login") === "true",
        userToken: sessionStorage.getItem("user-token"),
        userRole: sessionStorage.getItem("user-role"),
        userCompany: sessionStorage.getItem("company-name"),
        username: sessionStorage.getItem("username"),
      });
    }

    if (!isProtected && sessionStorage.getItem("is-login") === "true") {
      router.push(home_url);
    }
  }, [isProtected, router]);
  
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

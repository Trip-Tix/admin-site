import { Box, Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { login_url } from "@public/common/pagelinks";
import { UserInfoContext } from "@public/common/context";
import { useContext, useEffect } from "react";
import Head from "next/head";

interface LayoutProps {
  title: string;
  isProtected: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, isProtected, children }) => {
  const router = useRouter();
  const { isLogin } = useContext(UserInfoContext);

  useEffect(() => {
    if (isProtected && !isLogin) {
      router.push(login_url);
    }
  }, []);
  
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
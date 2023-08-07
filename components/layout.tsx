import { Box, Container, Heading } from "@chakra-ui/react";
import Head from "next/head";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
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

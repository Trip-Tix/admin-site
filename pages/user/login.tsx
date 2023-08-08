import { Flex, Button, Heading, Center } from "@chakra-ui/react";
import Image from "next/image";
import Login from "@components/login/login";
import SideImage from "@public/images/LoginPageImage.svg";
import Layout from "@components/layout";

export default function Home() {
  return (
    <Layout title="Login">
      <Flex direction="column" minHeight="100vh">
        <Flex direction="row" flexGrow={1}>
          <Flex direction="column">
            <Center>
              <Image
                src={SideImage}
                alt="Picture of triptix"
                width={1000}
                height={1000}
              />
            </Center>
          </Flex>
          <Flex
            direction="column"
            background="white"
            p={12}
            flexGrow={1}
            justifyContent={"center"}
          >
            <Login />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}

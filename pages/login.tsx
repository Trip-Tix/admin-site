import { Flex, Stack } from "@chakra-ui/react";

import { foreground, background } from "@public/common/color";

import Side_image from "@components/login/side_image";
import Title from "@components/login/title";
import Login_form from "@components/login/login_form";
import Helpful_link from "@components/login/helpful_link";

import Layout from "@components/layout";

export default function Main() {
  return (
    <Layout title="Login">
      <Stack
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
        background={background}
        color={foreground}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Title />
            <Login_form />
            <Helpful_link />
          </Stack>
        </Flex>
        <Side_image />
      </Stack>
    </Layout>
  );
}

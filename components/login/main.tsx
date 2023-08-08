import React, { useEffect, useState } from "react";
import { Flex, Center, Box, Image } from "@chakra-ui/react";
import Form from "@components/login/form";
import SideImage from "@components/login/side_image";

export default function Main() {
  
  
  return (
    <Flex direction="row" height={"100vh"} width={"100vw"}>
      <SideImage />
      <Form />
    </Flex>
  );
}

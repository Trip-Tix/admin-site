import { Flex, Button, Heading, Center } from "@chakra-ui/react";
import { Input as ChakraInput}  from "@chakra-ui/react" ;
import Image from "next/image";
import Login from "../components/login";
import Navbar from "../components/navbar";

export default function Home() {
  return(
    <Flex direction={"column"} justifyContent={"space-evenly"}>
      <Navbar color="#333" />
      <Flex direction={"row"} justifyContent={"space-evenly"}>
        <Flex grow={"1"} direction={"column"} basis={"100%"}>
          <Center>
            <Image 
              src="/images/HomePageImage.jpeg" 
              alt="Picture of triptix"
              width={1000} 
              height={1000}
            />
          </Center>
        </Flex>
        <Flex grow={"1"} direction={"column"} background={"white"} p={12} basis={"100%"}>
          <Login/>
        </Flex>
      </Flex>
    </Flex>
  )
}
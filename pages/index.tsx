import { Flex, Button, Heading, Center } from "@chakra-ui/react";
import { Input as ChakraInput}  from "@chakra-ui/react" ;
import Image from "next/image";

export default function Home() {
  return(
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
      <Flex grow={"1"} direction={"column"} background={"gray.800"} p={12} rounded={6} basis={"100%"}>
        <Heading mb={6} textAlign={"center"}>Log in</Heading>
        <ChakraInput placeholder={"email"} mb={3} type="email"/>
        <ChakraInput placeholder={"password"} mb={6} type="password"/>
        <Button mt={4} colorScheme={"blue"}>Get Started</Button>
      </Flex>
    </Flex>
  )
}
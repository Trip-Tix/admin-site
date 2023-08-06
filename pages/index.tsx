import { Flex, Button, Heading, Center } from "@chakra-ui/react";
import { Input as ChakraInput}  from "@chakra-ui/react" ;

export default function Home() {
  return(
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Flex direction={"column"} background={"gray.800"} p={12} rounded={6}>
        <Heading mb={6} color={"white"} textAlign={"center"}>Log in</Heading>
        <ChakraInput placeholder={"email"} mb={3} type="email"/>
        <ChakraInput placeholder={"password"} mb={6} type="password"/>
        <Button mt={4} colorScheme={"blue"}>Get Started</Button>
      </Flex>
    </Flex>
  )
}
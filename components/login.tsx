import { Heading, Button, Input as ChakraInput} from "@chakra-ui/react";

export default function Login() {
    return(
        <>
            <Heading mb={6} textAlign={"center"}>Log in</Heading>
            <ChakraInput placeholder={"email"} mb={3} type="email"/>
            <ChakraInput placeholder={"password"} mb={6} type="password"/>
            <Button mt={4} colorScheme={"blue"}>Get Started</Button>
        </>
    )
}
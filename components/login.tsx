import { useState } from "react";
import { Heading, Button, Input, Link, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Your login logic here (axios call, etc.)

    // Redirect to /admin/dashboard after successful login
    router.push("/admin/dashboard");
  };

  const handleSignUp = () => {
    // Redirect to /user/signup when user clicks the Sign Up link
    router.push("/user/signup");
  };

  return (
    <VStack spacing={6} align="center" p={6}>
      <Heading textAlign="center">Log In</Heading>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleLogin}>
        Log In
      </Button>
      <Text>
        Dont have an account?{" "}
        <Link color="blue.500" onClick={handleSignUp}>
          Sign Up
        </Link>
      </Text>
    </VStack>
  );
}

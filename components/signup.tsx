import { useState } from "react";
import { Heading, Button, Input, Link, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = () => {
    // Your signup logic here (axios call, etc.)

    // Redirect to /admin/dashboard after successful signup
    router.push("/admin/dashboard");
  };

  const handleLogin = () => {
    // Redirect to /user/login when user clicks the Log In link
    router.push("/user/login");
  };

  return (
    <VStack spacing={6} align="center" p={6}>
      <Heading textAlign="center">Sign Up</Heading>
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
      <Button colorScheme="blue" onClick={handleSignUp}>
        Sign Up
      </Button>
      <Text>
        Already have an account?
        <Link color="blue.500" onClick={handleLogin}>
          Log In
        </Link>
      </Text>
    </VStack>
  );
}

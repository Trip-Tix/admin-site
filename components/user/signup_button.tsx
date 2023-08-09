import React from "react";
import { Button, Text, Link } from "@chakra-ui/react";

interface Props {
  handleSignUp: () => void;
  padding: number;
  handleLogin: () => void;
  loading: boolean;
}


export default function Signup_button({
  handleSignUp,
  padding,
  handleLogin,
  loading
} : Props) {
  return <>
        <Button colorScheme="blue" onClick={handleSignUp} m={padding} isLoading={loading} loadingText="Loading...">
          Sign Up
        </Button>
        <Text>
          Already have an account?
          <Link color="blue.500" onClick={handleLogin}>
            Log In
          </Link>
        </Text>
      </>;
}
  
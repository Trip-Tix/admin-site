import React from "react";
import { Button, Text, Link } from "@chakra-ui/react";

interface Props {
  handleLogin: () => void;
  padding: number;
  handleSignUpButton: () => void;
  loading: boolean;
}


export default function Login_button({
  handleLogin,
  padding,
  handleSignUpButton,
  loading
} : Props) {
  return <>
        <Button colorScheme="blue" onClick={handleLogin} m={padding} isLoading={loading} loadingText="Loading...">
          Log In
        </Button>
        <Text>
          Don't have an account?
          <Link color="blue.500" onClick={handleSignUpButton}>
            Sign Up
          </Link>
        </Text>
      </>;
}
  
import { useState } from "react";
import {
  Heading,
  Button,
  Input,
  Link,
  VStack,
  Text,
  Flex,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import TripTixLogo from "@public/TripTixLogoBlack.svg";
import { admin_login_api } from "@public/commonData/ForeignAPI";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoginError("");
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Please enter your username.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }
    axios
      .post(admin_login_api, {
        username: username,
        password: password,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.message.match("Login successful")) {
          router.push("/user/dashboard");
        } else {
          setLoginError("Check your username and password.");
        }
      })
      .catch((err) => {
        if (err.response.data.message.match("Invalid credentials")) {
          setLoginError("Check your username and password.");
        } else {
          setLoginError("Error logging in. Please try again.");
        }
      });
  };

  const handleSignUp = () => {
    router.push("/user/signup");
  };

  const padding = 3;

  return (
    <Flex
      direction="column"
      background="white"
      p={12}
      flexGrow={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Center width={"10vw"}>
      <Image
        src={TripTixLogo}
        alt="Triptix Logo"
        priority
        placeholder="empty"
        height={100}
      />
      </Center>
      <Heading textAlign="center" fontSize={20} mt={padding / 2}>
        TripTix
      </Heading>
      <Heading textAlign="center" m={padding}>
        Log In
      </Heading>
      {loginError && (
        <Text color="red.500" fontSize="sm" m={padding / 2}>
          {loginError}
        </Text>
      )}
      <InputGroup justifyContent={"center"} width={"50%"}>
        <Input
          placeholder="Username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          m={padding}
          isInvalid={!!usernameError}
        />
      </InputGroup>
      {usernameError && (
        <Text color="red.500" fontSize="sm">
          {usernameError}
        </Text>
      )}
      <InputGroup justifyContent={"center"} width={"50%"}>
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          m={padding}
          isInvalid={!!passwordError}
        />
        <InputRightElement m={padding}>
          {showPassword ? (
            <ViewOffIcon
              h="1.5rem"
              cursor="pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <ViewIcon
              h="1.5rem"
              cursor="pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </InputRightElement>
      </InputGroup>
      {passwordError && (
        <Text color="red.500" fontSize="sm">
          {passwordError}
        </Text>
      )}
      <Button colorScheme="blue" onClick={handleLogin} m={padding}>
        Log In
      </Button>
      <Text>
        Don't have an account?{" "}
        <Link color="blue.500" onClick={handleSignUp}>
          Sign Up
        </Link>
      </Text>
    </Flex>
  );
}

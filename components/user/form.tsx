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
import {
  admin_login_api,
  admin_signup_api,
} from "@public/commonData/ForeignAPI";

import UsernameInput from "@components/user/username_input";
import PasswordInput from "@components/user/password_input";
import SignUpButton from "@components/user/signup_button";
import LoginButton from "@components/user/login_button";

import { signup_url, login_url, dashboard_url } from "@public/commonData/PageLinks";
import { log } from "console";

interface Props {
  type: string;
}

export default function Login({ type }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminname, setAdminname] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [adminnameError, setAdminnameError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    setSignupError("");
    setUsernameError("");
    setPasswordError("");
    setAdminnameError("");

    if (!username) {
      setUsernameError("Please enter your username.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    if (!adminname) {
      setAdminnameError("Please enter your admin name.");
      return;
    }

    setLoading(true);

    axios
      .post(admin_signup_api, {
        username: username,
        password: password,
        adminName: adminname,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.message.match("Admin created")) {
          router.push(login_url);
        }
      })
      .catch((err) => {
        if (err.response.data.message.match("Username already exists")) {
          setUsernameError("Username already exists.");
        } else {
          setSignupError("Error signing up. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

    setLoading(true);

    axios
      .post(admin_login_api, {
        username: username,
        password: password,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.message.match("Login successful")) {
          router.push(dashboard_url);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignUpButton = () => {
    router.push(signup_url);
  };

  const handleLoginButton = () => {
    router.push(login_url);
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
      <Image
        src={TripTixLogo}
        alt="Triptix Logo"
        priority
        placeholder="empty"
        height={50}
      />
      <Text textAlign="center" fontSize={20} mt={padding / 2}>
        TripTix
      </Text>

      {type === "login" && (
        <Heading textAlign="center" fontSize={20} mt={padding}>
          Admin Login
        </Heading>
      )}

      {type === "signup" && (
        <Heading textAlign="center" fontSize={20} mt={padding}>
          Admin Sign Up
        </Heading>
      )}

      {type === "login" && loginError && (
        <Text color="red.500" fontSize="sm" m={padding / 2}>
          {loginError}
        </Text>
      )}

      {type === "signup" && signupError && (
        <Text color="red.500" fontSize="sm" m={padding / 2}>
          {signupError}
        </Text>
      )}

      <UsernameInput
        username={username}
        setUsername={setUsername}
        padding={padding}
        usernameError={usernameError}
        placeholder="Username"
      />

      {type === "signup" && (
        <UsernameInput
          username={adminname}
          setUsername={setAdminname}
          padding={padding}
          usernameError={adminnameError}
          placeholder="Admin Name"
        />
      )}

      <PasswordInput
        showPassword={showPassword}
        password={password}
        setPassword={setPassword}
        padding={padding}
        passwordError={passwordError}
        setShowPassword={setShowPassword}
      />
      {type === "login" && (
        <LoginButton
          handleLogin={handleLogin}
          padding={padding}
          handleSignUpButton={handleSignUpButton}
          loading={loading}
        />
      )}
      {type === "signup" && (
        <SignUpButton
          handleSignUp={handleSignUp}
          padding={padding}
          handleLogin={handleLoginButton}
          loading={loading}
        />
      )}
    </Flex>
  );
}

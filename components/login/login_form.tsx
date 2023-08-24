import React from "react";
import {
  Heading,
  Input,
  Link,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineKey,AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {
  foreground,
  lightForeground,
  background,
  accent1,
  accent2,
  darkBackground,
} from "@public/common/color";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { postLogin } from "@public/common/api";
import axios from "axios";
import { home_url } from "@public/common/pagelinks";

export default function Login_form() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


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

    console.log(postLogin);

    axios
      .post(postLogin, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setUserToken(res.data.userToken);
        setIsLogin(true);
        sessionStorage.setItem("user-token", res.data.token);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("user-role", res.data.adminRole);
        sessionStorage.setItem("is-login", "true");
        router.push(home_url);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          setLoginError("Server didn't receive any data.");
        } else if (err.response.status === 401) {
          setLoginError("Wrong username");
        } else if (err.response.status === 402) {
          setLoginError("Wrong password");
        } else {
          setLoginError("Something went wrong. Please try again later.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {" "}
      <Heading fontSize={"2xl"}>Sign in</Heading>
      {loginError && (
        <Text color="red.500" fontSize="sm">
          {loginError}
        </Text>
      )}
      <FormControl id="username">
        {usernameError && (
          <Text color="red.500" fontSize="sm">
            {usernameError}
          </Text>
        )}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineUser color={darkBackground} />
          </InputLeftElement>
          <Input
            type="username"
            placeholder="Username"
            color={foreground}
            onChange={(e) => setUsername(e.target.value)}
            
          />
        </InputGroup>
      </FormControl>
      <FormControl id="password">
        {passwordError && (
          <Text color="red.500" fontSize="sm">
            {passwordError}
          </Text>
        )}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineKey color={darkBackground} />
          </InputLeftElement>
          <Input
            type={showPassword? "name" : "password"}
            placeholder="Password"
            color={foreground}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            {showPassword ? (
              <AiOutlineEyeInvisible
                color={darkBackground}
                cursor={"pointer"}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiOutlineEye
                color={darkBackground}
                cursor={"pointer"}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Link href="#" color={accent1}>
        {" "}
        Forgot Password ?
      </Link>
      <Button background={accent1} color={background} variant={"solid"} onClick={handleLogin} isLoading={loading}>
        Sign in
      </Button>
    </>
  );
}

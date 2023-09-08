import React, { useEffect } from "react";
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
  Select,
  useToast,
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  AiOutlineKey,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
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
import { postSignup } from "@public/common/user_api";
import axios from "axios";
import { login_url } from "@public/common/pagelinks";
import { MdArrowDropDown } from "react-icons/md";

export default function Signup_form() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [services, setServices] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();


  const handleSignup = () => {
    setSignupError("");
    setUsernameError("");
    setPasswordError("");
    setCompanyName("");
    setServices("");
    setEmail("");
    setFullName("");

    if (!username) {
      setUsernameError("Please enter your username.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    if (!companyName) {
        setCompanyNameError("Please enter your service name.");
        return;
    }

    if (!services) {
        setServiceError("Please enter your service.");
        return;
    }

    if (!email) {
        setEmailError("Please enter your email.");
        return;
    }
    

    setLoading(true);

    console.log(postSignup);

    axios
        .post(postSignup, {
            adminName: fullName,
            username: username,
            password: password,
            companyName: companyName,
            services: services,
            email: email,
            adminRole: "pending",
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
            sessionStorage.setItem("company-name", res.data.companyName);
            toast({
                title: "Request Submitted",
                description: "Your request has been submitted. Please wait for the admin to approve your request.",
                status: "success",
                duration: 4000,
                isClosable: true,
                onCloseComplete: () => {
                    router.push(login_url);
                }
            });
        })
        .catch((err) => {
            setLoading(false);
            if (err.response.status === 400) {
                setSignupError("Server didn't receive any data.");
            } else {
                setSignupError(err.response.data.message);
            }
        })
        .finally(() => setLoading(false));
    };



  return (
    <FormControl isRequired>
        <Heading fontSize={"2xl"}>Sign Up</Heading>
        <InputGroup mt={4}>
        <InputLeftElement>
            <AiOutlineUser color={foreground} />
        </InputLeftElement>
        <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            background={background}
            color={foreground}
            _placeholder={{ color: foreground }}
            borderColor={accent2}
            _hover={{ borderColor: accent1 }}
            _focus={{ borderColor: accent1 }}
        />
        </InputGroup>
        <Text color={"red.500"}>{fullNameError}</Text>
      <InputGroup>
        <InputLeftElement>
          <AiOutlineUser color={foreground} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          background={background}
          color={foreground}
          _placeholder={{ color: foreground }}
          borderColor={accent2}
          _hover={{ borderColor: accent1 }}
          _focus={{ borderColor: accent1 }}
        />
      </InputGroup>
      <Text color={"red.500"}>{usernameError}</Text>
      <InputGroup mt={4}>
        <InputLeftElement>
          <AiOutlineKey color={foreground} />
        </InputLeftElement>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          background={background}
          color={foreground}
          _placeholder={{ color: foreground }}
          borderColor={accent2}
          _hover={{ borderColor: accent1 }}
          _focus={{ borderColor: accent1 }}
        />
        <InputRightElement>
          {showPassword ? (
            <AiOutlineEyeInvisible
              color={foreground}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <AiOutlineEye
              color={foreground}
              onClick={() => setShowPassword(true)}
            />
          )}
        </InputRightElement>
      </InputGroup>
      <Text color={"red.500"}>{passwordError}</Text>
      <InputGroup mt={4}>
        <Select
            icon={<MdArrowDropDown />}
            placeholder="Select option"
            background={background}
            color={foreground}
            _placeholder={{ color: foreground }}
            borderColor={accent2}
            onChange={(e) => setServices(e.target.value)}
            _hover={{ borderColor: accent1 }}
            _focus={{ borderColor: accent1 }}
        >
            <option value="Bus Services">Bus Services</option>
            <option value="Train Services">Train Services</option>
            <option value="Air Services">Air Services</option>
        </Select>
        </InputGroup>
        <Text color={"red.500"}>{serviceError}</Text>
        <InputGroup mt={4}>
        <Input
            type="text"
            placeholder="Service Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            background={background}
            color={foreground}
            _placeholder={{ color: foreground }}
            borderColor={accent2}
            _hover={{ borderColor: accent1 }}
            _focus={{ borderColor: accent1 }}
        />
        </InputGroup>
        <Text color={"red.500"}>{companyNameError}</Text>
        <InputGroup mt={4}>
        <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            background={background}
            color={foreground}
            _placeholder={{ color: foreground }}
            borderColor={accent2}
            _hover={{ borderColor: accent1 }}
            _focus={{ borderColor: accent1 }}
        />
        </InputGroup>
        <Text color={"red.500"}>{emailError}</Text>
      <Text color={"red.500"}>{signupError}</Text>
      <Button
        mt={8}
        w={"full"}
        bg={accent1}
        color={background}
        _active={{
          bg: accent2,
          transform: "scale(0.95)",
        }}
        isLoading={loading}
        loadingText="Logging in"
        onClick={handleSignup}
      >
        Sign Up
      </Button>
    </FormControl>
  );
}

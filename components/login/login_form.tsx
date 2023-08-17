import React from "react";
import {
  Heading,
  Input,
  Link,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineKey } from "react-icons/ai";
import {
  foreground,
  lightForeground,
  background,
  accent1,
  accent2,
  darkBackground,
} from "@public/common/color";

export default function Login_form() {
  return (
    <>
      {" "}
      <Heading fontSize={"2xl"}>Sign in</Heading>
      <FormControl id="username">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineUser color={darkBackground} />
          </InputLeftElement>
          <Input type="username" placeholder="Username" color={foreground} />
        </InputGroup>
      </FormControl>
      <FormControl id="password">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiOutlineKey color={darkBackground} />
          </InputLeftElement>
          <Input type="password" placeholder="Password" color={foreground} />
        </InputGroup>
      </FormControl>
      <Link href="#" color={accent1}>
        {" "}
        Forgot Password ?
      </Link>
      <Button background={accent1} color={background} variant={"solid"}>
        Sign in
      </Button>
    </>
  );
}

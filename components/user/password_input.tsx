import React from "react";
import { Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface Props {
  showPassword: boolean;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  padding: number;
  passwordError: string | null;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Password_input({
  showPassword,
  password,
  setPassword,
  padding,
  passwordError,
  setShowPassword,
}: Props) {
  return (
    <>
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
    </>
  );
}

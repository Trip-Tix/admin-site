import React from "react";
import { Input, InputGroup, Text } from "@chakra-ui/react";

interface Props {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  padding: number
  usernameError: string | null;
  placeholder: string;
}

export default function Username_input({
  username,
  setUsername,
  padding,
  usernameError,
  placeholder
}: Props) {
  return (
    <>
      <InputGroup justifyContent={"center"} width={"50%"}>
        <Input
          placeholder={placeholder}
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
    </>
  );
}

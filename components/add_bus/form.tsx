import {
    InputGroup,
    VStack,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  export default function Form() {
    return (
      <FormControl>
        <FormLabel>Bus Name</FormLabel>
        <Input type="email" />
      </FormControl>
    );
  }
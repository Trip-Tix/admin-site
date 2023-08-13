import {
  InputGroup,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Form() {

    const label = "Bus Registration Number";
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (event) => {
        if (!event.target.value) {
        setIsFocused(false);
        }
    };


  return (
    <VStack spacing={"4"} align={"stretch"} pt={"5"}>
      <FormControl>
        <FormLabel
          transform={isFocused ? "translateY(-120%) scale(0.75)" : "none"}
          transition="transform 0.2s ease-in-out"
          pointerEvents="none"
          position="absolute"
          ml="2"
          color={isFocused ? "blue.500" : "gray.500"}
        >
          {label}
        </FormLabel>
        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderRadius="none"
          borderBottomWidth="2px"
          px="2"
          
        />
      </FormControl>
    </VStack>
  );
}

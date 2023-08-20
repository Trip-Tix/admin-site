import { Box, useColorModeValue } from "@chakra-ui/react";


interface seatProps {
  exists: boolean;
}

export default function Seat({ exists }: seatProps) {
  return (
    <Box
      w={"20px"}
      h={"20px"}
      visibility={exists ? { base: "hidden", md: "visible" } : "hidden"}
      rounded={"md"}
      bg={useColorModeValue("gray.400", "gray.500")}
    />
  );
}

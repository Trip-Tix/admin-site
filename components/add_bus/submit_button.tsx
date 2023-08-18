"use client";

import { Button, Flex } from "@chakra-ui/react";
import { BsDatabaseAdd } from "react-icons/bs";

export default function FollowButtonWithShadow() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Button leftIcon={<BsDatabaseAdd />} colorScheme="teal" variant="solid" >
        Add Bus
      </Button>
    </Flex>
  );
}

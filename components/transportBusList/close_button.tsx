import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface Props {
  reset: () => void;
  setFilterVisible: (value: boolean) => void;
}

export function Close_button({ reset, setFilterVisible }: Props) {
  return (
    <Flex direction={"row-reverse"} alignItems={"center"}>
      <Icon
        as={CloseIcon}
        height={"3"}
        width={"3"}
        onClick={() => {
          reset();
          setFilterVisible(false);
        }}
        cursor={"pointer"}
      />
    </Flex>
  );
}

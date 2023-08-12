import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { darkerBackground, lightForeground } from "@public/commonData/Colors";

interface Props {
  loading: boolean;
  setFilterVisible: (value: boolean) => void;
}

export function Filter_button({ loading, setFilterVisible }: Props) {
  return (
    <Flex
      direction={"row"}
      border="1px"
      borderColor={darkerBackground}
      alignItems={"center"}
      rounded={"10"}
      color={lightForeground}
    >
      <Icon
        as={TriangleDownIcon}
        height={"10"}
        width={"10"}
        onClick={() => {
          if (!loading) setFilterVisible(true);
        }}
        cursor={"pointer"}
        marginRight={"4"}
        padding={"1"}
      />
      <Text paddingRight={"2"}>Filter</Text>
    </Flex>
  );
}

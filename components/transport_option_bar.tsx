import { Flex, Image, Text, border } from "@chakra-ui/react";
import {
  transport_optionbar_items,
  transport_optionbar_logos,
} from "../public/commonData/TransportOptionBarData";

import { foreground, lightForeground, darkerBackground, background, accent } from "@public/commonData/Colors"

interface TransportOptionBarProps {
  selectedOption: string;
}

export default function TransportOptionBar({
  selectedOption,
}: TransportOptionBarProps) {
  return (
    <Flex
      direction="row"
      justifyContent="center"
      alignItems="center"
      backgroundColor={darkerBackground}
    >
      {transport_optionbar_items.map((item, index) => (
        <Flex
          key={item}
          direction="row"
          alignItems="center"
          paddingY={3}
          paddingX={10}
          cursor="pointer"
          backgroundColor={
            item === selectedOption ? background : darkerBackground
          }
          _hover={{
            marginBottom: "-5px", 
            borderBottom: "5px solid",
            borderColor: 
              item !== selectedOption ?   accent : background,
          }}
        >
          <Image
            src={transport_optionbar_logos[index]}
            alt={`${item} Logo`}
            width={5}
            height={5}
            mr={2}
            color={accent}
          />
          <Text>{item}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

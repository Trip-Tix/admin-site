import { Flex, Image, Text } from "@chakra-ui/react";
import { transport_optionbar_items, transport_optionbar_logos } from "../public/commonData/TransportOptionBarData"; 
import { backgroundColor, selectedColor, hoverColor } from "../public/commonData/CommonColor"

interface TransportOptionBarProps {
  selectedOption: string;
}

export default function TransportOptionBar({selectedOption }: TransportOptionBarProps) {
  return (
    <Flex direction="row" justifyContent="center" alignItems="center" backgroundColor={backgroundColor}>
      {transport_optionbar_items.map((item, index) => (
        <Flex
          key={item}
          direction="row"
          alignItems="center"
          paddingY={3}
          paddingX={10}
          cursor="pointer"
          backgroundColor={item === selectedOption ? selectedColor : backgroundColor}
          _hover={{ backgroundColor: item !== selectedOption ? hoverColor : selectedColor }}
        >
          <Image src={transport_optionbar_logos[index]} alt={`${item} Logo`} width={5} height={5} mr={2} />
          <Text>{item}</Text>
        </Flex>
      ))}
    </Flex>
  );
}

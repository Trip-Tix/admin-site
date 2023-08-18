import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { BsFillBusFrontFill, BsFillTrainFrontFill,BsFillAirplaneFill } from "react-icons/bs";

export default function TransportSelect() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="gray"
        aria-label="Bus"
        fontSize="20px"
        icon={<BsFillBusFrontFill />}
        m={4}
      />
      <IconButton
        isRound={true}
        variant="outline"
        colorScheme="gray"
        aria-label="Train"
        fontSize="20px"
        icon={<BsFillTrainFrontFill  />}
        m={4}
      />
      <IconButton
        isRound={true}
        variant="outline"
        colorScheme="gray"
        aria-label="Plane"
        fontSize="20px"
        icon={<BsFillAirplaneFill />}
        m={4}
      />
    </Flex>
  );
}

import { useContext } from "react";
import { FlightAddContext } from "@public/common/context";

import { Button, Flex } from "@chakra-ui/react";
import { BsDatabaseAdd } from "react-icons/bs";

interface SubmitButtonProps {
  classKeys: number[];
}

export default function FollowButtonWithShadow({ classKeys }: SubmitButtonProps) {
  const { setCheck, flightName, classes } = useContext(FlightAddContext);
  return (
    <Flex justifyContent="center" alignItems="center">
      <Button leftIcon={<BsDatabaseAdd />} colorScheme="teal" variant="solid" onClick={() => setCheck(true)} isDisabled={flightName.length == 0 || classKeys.length == 0}>
        Add Flight
      </Button>
    </Flex>
  );
}

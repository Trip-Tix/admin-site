import { useContext } from "react";
import { BusAddContext } from "@public/common/context";

import { Button, Flex } from "@chakra-ui/react";
import { BsDatabaseAdd } from "react-icons/bs";

interface SubmitButtonProps {
  coachKeys: number[];
}

export default function FollowButtonWithShadow({ coachKeys }: SubmitButtonProps) {
  const { setCheck, busName, coaches } = useContext(BusAddContext);
  return (
    <Flex justifyContent="center" alignItems="center">
      <Button leftIcon={<BsDatabaseAdd />} colorScheme="teal" variant="solid" onClick={() => setCheck(true)} isDisabled={busName.length == 0 || coachKeys.length == 0}>
        Add Bus
      </Button>
    </Flex>
  );
}

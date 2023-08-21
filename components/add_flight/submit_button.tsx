import { useContext } from "react";
import { TrainAddContext } from "@public/common/context";

import { Button, Flex } from "@chakra-ui/react";
import { BsDatabaseAdd } from "react-icons/bs";

interface SubmitButtonProps {
  coachKeys: number[];
}

export default function FollowButtonWithShadow({ coachKeys }: SubmitButtonProps) {
  const { setCheck, trainName, coaches } = useContext(TrainAddContext);
  return (
    <Flex justifyContent="center" alignItems="center">
      <Button leftIcon={<BsDatabaseAdd />} colorScheme="teal" variant="solid" onClick={() => setCheck(true)} isDisabled={trainName.length == 0 || coachKeys.length == 0}>
        Add Train
      </Button>
    </Flex>
  );
}

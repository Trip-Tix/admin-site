import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { VStack, HStack, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import CoachCard from "@components/add_train/coach_card";
import { useColorModeValue } from "@chakra-ui/react";

const coachList = ["AC", "Economy", "Sleeper"];

interface NewCoachesProps {
  coachKeys: number[];
  setCoachKeys: (keys: number[]) => void;
}

export default function NewCoaches({ coachKeys, setCoachKeys }) {
  const [numberOfCoaches, setNumberOfCoaches] = useState(0);

  const addCoach = () => {
    setNumberOfCoaches(numberOfCoaches + 1);
    setCoachKeys([...coachKeys, numberOfCoaches]);
  };

  return (
    <>
      {coachKeys.map((key) => (
        <CoachCard
          key={key}
          ChildrenButton={
            <Button
              onClick={() => setCoachKeys(coachKeys.filter((k) => k !== key))}
            >
              Remove
            </Button>
          }
        />
      ))}
      <HStack>
        <Text fontSize="xl">Coaches</Text>
        <IconButton
          aria-label="Add Coach"
          icon={<AddIcon />}
          onClick={addCoach}
        />
      </HStack>
    </>
  );
}

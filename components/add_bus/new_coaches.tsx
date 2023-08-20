import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { VStack, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import CoachCard from "@components/add_bus/coach_card";

const coachList = ["AC", "Seat", "Bus"];

export default function NewCoaches() {
  const [numberOfCoaches, setNumberOfCoaches] = useState(0);
  const [coachKeys, setCoachKeys] = useState<number[]>([]);

  const addCoach = () => {
    setNumberOfCoaches(numberOfCoaches + 1);
    setCoachKeys([...coachKeys, numberOfCoaches]);
  };

  return (
    <>
      {coachKeys.map((key) => (
        <div key={key}>
          <p>Coach {key}</p>
          <button onClick={() => setCoachKeys(coachKeys.filter((k) => k !== key))}>
            Remove Coach
          </button>
        </div>
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

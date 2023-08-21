import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { VStack, HStack, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import ClassCard from "@components/add_flight/class_card";
import { useColorModeValue } from "@chakra-ui/react";

const classList = ["AC", "Economy", "Sleeper"];

interface NewClassesProps {
  classKeys: number[];
  setClassKeys: (keys: number[]) => void;
}

export default function NewClasses({ classKeys, setClassKeys }) {
  const [numberOfClasses, setNumberOfClasses] = useState(0);

  const addClass = () => {
    setNumberOfClasses(numberOfClasses + 1);
    setClassKeys([...classKeys, numberOfClasses]);
  };

  return (
    <>
      {classKeys.map((key) => (
        <ClassCard
          key={key}
          ChildrenButton={
            <Button
              onClick={() => setClassKeys(classKeys.filter((k) => k !== key))}
            >
              Remove
            </Button>
          }
        />
      ))}
      <HStack>
        <Text fontSize="xl">Classes</Text>
        <IconButton
          aria-label="Add Class"
          icon={<AddIcon />}
          onClick={addClass}
        />
      </HStack>
    </>
  );
}

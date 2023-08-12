import { Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";

interface Props {
    List: string[];
    removeAction: (coach: string) => void;
}


export default function TagList({List, removeAction}: Props) {
    return (
        <>
            {List.map((coach) => (
                <Tag
                  key={coach}
                  size={"md"}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="green"
                  mr={"4"}
                >
                  <TagLabel>{coach}</TagLabel>
                  <TagCloseButton onClick={() => removeAction(coach)} />
                </Tag>
              ))}
        </>
    );
}
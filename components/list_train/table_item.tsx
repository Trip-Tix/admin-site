import { useColorMode } from "@chakra-ui/color-mode";
import { useContext } from "react";
import { TrainInfoContext } from "@public/common/context";
import { Tr, Td } from "@chakra-ui/react";
import CoachTag from "@components/list_train/coach_tag";

interface TableItemProps {
  name: string;
  trainId: string;
  coachId: string;
  amount: number;
}

export default function TableItem({
  name,
  trainId,
  coachId,
  amount,
}: TableItemProps) {
  const { colorMode } = useColorMode();
  const { setTrainId, setCoachId } = useContext(TrainInfoContext);

  const handleClick = () => {
    setTrainId(trainId);
    setCoachId(coachId);
  };
  return (
    <Tr
      _hover={
        colorMode == "light"
          ? {
              bg: "gray.200",
            }
          : {
              bg: "gray.600",
            }
      }
      cursor={"pointer"}
      onClick={handleClick}
    >
      <Td>{name}</Td>
      <Td>{trainId}</Td>
      <Td>
        <CoachTag coachId={coachId} />
      </Td>
      <Td isNumeric>{amount}</Td>
    </Tr>
  );
}

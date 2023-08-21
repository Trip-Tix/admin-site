import { useColorMode } from "@chakra-ui/color-mode";
import { useContext } from "react";
import { BusInfoContext } from "@public/common/context";
import { Tr, Td } from "@chakra-ui/react";
import CoachTag from "@components/list_bus/coach_tag";

interface TableItemProps {
  busName: string;
  busId: string;
  coachName: string;
  amount: number;
  busCoachId: string;
}

export default function TableItem({
  busName,
  busId,
  coachName,
  amount,
  busCoachId,
}: TableItemProps) {
  const { colorMode } = useColorMode();
  const { setBusId, setCoachId } = useContext(BusInfoContext);

  const handleClick = () => {
    setBusId(busId);
    setCoachId(busCoachId);
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
      <Td>{busName}</Td>
      <Td>{busCoachId}</Td>
      <Td>
        <CoachTag coachName={coachName} />
      </Td>
      <Td isNumeric>{amount}</Td>
    </Tr>
  );
}

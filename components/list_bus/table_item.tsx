import { useColorMode } from "@chakra-ui/color-mode";
import { useContext } from "react";
import { BusInfoContext } from "@public/common/context";
import { Tr, Td } from "@chakra-ui/react";
import CoachTag from "@components/list_bus/coach_tag";

interface TableItemProps {
  name: string;
  busId: string;
  coachType: string;
  amount: number;
}

export default function TableItem({
  name,
  busId,
  coachType,
  amount,
}: TableItemProps) {
  const { colorMode } = useColorMode();
  const { setBusId, setCoachId } = useContext(BusInfoContext);

  const handleClick = () => {
    setBusId(busId);
    setCoachId(coachType);
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
      <Td>{busId}</Td>
      <Td>
        <CoachTag coachType={coachType} />
      </Td>
      <Td isNumeric>{amount}</Td>
    </Tr>
  );
}

import { useColorMode } from "@chakra-ui/color-mode";
import { useContext } from "react";
import { FlightInfoContext } from "@public/common/context";
import { Tr, Td } from "@chakra-ui/react";
import ClassTag from "@components/list_flight/class_tag";

interface TableItemProps {
  name: string;
  flightId: string;
  classId: string;
  amount: number;
}

export default function TableItem({
  name,
  flightId,
  classId,
  amount,
}: TableItemProps) {
  const { colorMode } = useColorMode();
  const { setFlightId, setClassId } = useContext(FlightInfoContext);

  const handleClick = () => {
    setFlightId(flightId);
    setClassId(classId);
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
      <Td>{flightId}</Td>
      <Td>
        <ClassTag classId={classId} />
      </Td>
      <Td isNumeric>{amount}</Td>
    </Tr>
  );
}

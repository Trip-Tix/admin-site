import {
  Box,
  Button,
  Input,
  List,
  Text,
  Select,
  VStack,
  HStack,
  useColorModeValue,
  Heading,
  Flex,
  Divider,
} from "@chakra-ui/react";
import {
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { class_interface } from "@public/common/flight_interfaces";
import ShowLayout from "@components/add_flight/show_layout";
import LayoutCreation from "@components/add_flight/layout_creation";
import AmountList from "@components/add_flight/amount_list";
import { addNewFlight } from "@public/common/flight_api";

interface ClassCardProps {
  removalAction: {
    key: string;
    removeClass: (key: string) => void;
    validateClass: (key: string, isValid: boolean) => void;
  };
  classList: class_interface[];
  submit: boolean;
}

export default function ClassCard({
  removalAction,
  classList,
  submit,
}: ClassCardProps) {
  const [selectedClass, setSelectedClass] = useState<class_interface>();
  const [layout, setLayout] = useState<number[][]>([
    [1, 0],
    [0, 1],
  ]);
  const [row, setRow] = useState<number>(2);
  const [col, setCol] = useState<number>(2);
  const [numSeat, setNumSeat] = useState<number>(2);
  const [numFlight, setNumFlight] = useState<number>(0);
  const [uniqueFlightId, setUniqueFlightId] = useState<string[]>([]);

  useEffect(() => {
    if (submit) {
      addNewFlight({
        classId: selectedClass?.classId,
        numFlight: numFlight,
        uniqueFlightId: uniqueFlightId,
        numSeat: numSeat,
        layout: layout,
        row: row,
        col: col,
      });
    }
  }, [submit]);

  useEffect(() => {
    if (selectedClass) {
      removalAction.validateClass(removalAction.key, true);
    } else {
      removalAction.validateClass(removalAction.key, false);
    }
  }, [selectedClass]);

  return (
    <>
      <Flex
        direction={"column"}
        borderRadius={"md"}
        overflow="hidden"
        w={"100%"}
        bg={useColorModeValue("gray.300", "gray.800")}
        boxShadow={"md"}
      >
        {/* Remove Class Button */}
        <Flex
          w={"100%"}
          p={5}
          direction={"row-reverse"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={() => removalAction.removeClass(removalAction.key)}
            colorScheme="red"
          >
            <AiOutlineClose />
          </Button>
        </Flex>
        {/* Class Card Content */}
        <Flex
          align={"right"}
          w={"100%"}
          justifyContent={"space-between"}
          p={2}
        >
          <Flex alignContent={"center"}>
            <Text fontWeight={"bold"} mr={2}>
              Class:
            </Text>
            <Text fontStyle={"italic"}>{selectedClass?.className}</Text>
          </Flex>
        </Flex>
        <Divider />
        <LayoutCreation
          row={row}
          setRow={setRow}
          col={col}
          setCol={setCol}
          layout={layout}
          setLayout={setLayout}
          numSeat={numSeat}
          setNumSeat={setNumSeat}
        />
        <Divider />
        <AmountList
          className={selectedClass?.className}
          classId={selectedClass?.classId}
          numFlight={numFlight}
          setNumFlight={setNumFlight}
          uniqueFlightId={uniqueFlightId}
          setUniqueFlightId={setUniqueFlightId}
          removalAction={removalAction}
        />
      </Flex>
    </>
  );
}

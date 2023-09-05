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
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LayoutCreation from "@components/add_flight/layout_creation";
import AmountList from "@components/add_flight/amount_list";
import { addNewFlight } from "@public/common/flight_api";
import { class_interface } from "@public/common/flight_interfaces";

import { fetchClassList } from "@public/common/flight_api";

interface ClassCardProps {
  removalAction: {
    key: string;
    removeClass: (key: string) => void;
    validateClass: (key: string, isValid: boolean) => void;
  };
  submit: boolean;
}

export default function ClassCard({
  removalAction,
  submit,
}: ClassCardProps) {
  const [selectedClass, setSelectedClass] = useState<class_interface | undefined>();
  const [layout, setLayout] = useState<number[][]>([
    [1, 0],
    [0, 1],
  ]);
  const [row, setRow] = useState<number>(2);
  const [col, setCol] = useState<number>(2);
  const [numSeat, setNumSeat] = useState<number>(2);
  const [numFlight, setNumFlight] = useState<number>(0);
  const [uniqueFlightId, setUniqueFlightId] = useState<string[]>([]);

  // Fetching class list within ClassCard
  const [classList, setClassList] = useState<class_interface[]>([]);
  const [classListLoading, setClassListLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setClassListLoading(true);
      const classes = await fetchClassList();
      setClassList(classes);
      setClassListLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(classList);
  }, [classList]);

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

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = classList.find((cls) => cls.classId.toString() === e.target.value);
    setSelectedClass(selected);
  };

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
          <Flex alignContent={"center"} w={"50%"}>
            <Select
              placeholder="Select Class"
              value={selectedClass?.classId}
              onChange={handleClassChange}
              w={"100%"}
            >
              {classList.map((cls) => (
                <option key={cls.classId} value={cls.classId}>
                  {cls.className}
                </option>
              ))}
            </Select>
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

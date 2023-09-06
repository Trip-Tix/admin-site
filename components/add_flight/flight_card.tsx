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
  Spacer,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LayoutCreation from "@components/add_flight/layout_creation";
import AmountList from "@components/add_flight/amount_list";
import { addNewFlight } from "@public/common/flight_api";
import { class_interface } from "@public/common/flight_interfaces";

import { fetchClassList } from "@public/common/flight_api";

interface FlightCardProps {
  removalAction: {
    key: string;
    removeFlight: (key: string) => void;
    validateFlight: (key: string, isValid: boolean) => void;
  };
  submit: boolean;
}

export default function FlightCard({
  removalAction,
  submit,
}: FlightCardProps) {
  const [selectedClasses, setSelectedClasses] = useState<class_interface[]>([]);
  const [classForms, setClassForms] = useState<number[]>([1]);

  const [layout, setLayout] = useState<number[][]>([
    [1, 0],
    [0, 1],
  ]);
  const [row, setRow] = useState<number>(2);
  const [col, setCol] = useState<number>(2);
  const [numSeat, setNumSeat] = useState<number>(2);
  const [numFlight, setNumFlight] = useState<number>(0);
  const [uniqueFlightId, setUniqueFlightId] = useState<string[]>([]);

  // Fetching class list within FlightCard
  const [classList, setClassList] = useState<class_interface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const classes = await fetchClassList();
      setClassList(classes);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (submit) {
      // You can modify this to handle multiple class submissions
      addNewFlight({
        classId: selectedClasses[0]?.classId,
        numFlight: numFlight,
        uniqueFlightId: uniqueFlightId,
        numSeat: numSeat,
        layout: layout,
        row: row,
        col: col,
      });
    }
  }, [submit]);

  const handleClassChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = classList.find((cls) => cls.classId.toString() === e.target.value);
    let updatedClasses = [...selectedClasses];
    updatedClasses[index] = selected!;
    setSelectedClasses(updatedClasses);
  };

  const handleAddClass = () => {
    setClassForms([...classForms, classForms.length + 1]);
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
            onClick={() => removalAction.removeFlight(removalAction.key)}
            colorScheme="red"
          >
            <AiOutlineClose />
          </Button>
        </Flex>

        {classForms.map((_, index) => (
          <React.Fragment key={index}>
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
                  value={selectedClasses[index]?.classId}
                  onChange={(e) => handleClassChange(index, e)}
                  w={"100%"}
                >
                  {classList.filter(cls => !selectedClasses.includes(cls)).map((cls) => (
                    <option key={cls.classId} value={cls.classId}>
                      {cls.className}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Flex>
            <Box height="10px" />
            <Divider />
            <Box height="10px" />
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
            <Box height="10px" />
            <Divider />
            <Box height="10px" />
          </React.Fragment>
        ))}
        
        <Box height="20px" />
        <Divider />
        <Box height="20px" />
        {/* Add Class Button */}
        <Flex justifyContent="center">
          <Button onClick={handleAddClass} width="120px">Add Class</Button>
        </Flex>
        <Box height="20px" />
        <Divider />
        <Box height="20px" />

        <AmountList
          className={selectedClasses[0]?.className}
          classId={selectedClasses[0]?.classId}
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
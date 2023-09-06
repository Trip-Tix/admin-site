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

  // Initialize states for each class form's properties
  const [rows, setRows] = useState<number[]>([2]);
  const [cols, setCols] = useState<number[]>([2]);
  const [layouts, setLayouts] = useState<number[][][]>([[[1, 0], [0, 1]]]);
  const [numSeats, setNumSeats] = useState<number[]>([2]);


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

  // useEffect(() => {
  //   if (submit) {
  //     // You can modify this to handle multiple class submissions
  //     addNewFlight({
  //       classId: selectedClasses[0]?.classId,
  //       numFlight: numFlight,
  //       uniqueFlightId: uniqueFlightId,
  //       numSeat: numSeat,
  //       layout: layout,
  //       row: row,
  //       col: col,
  //     });
  //   }
  // }, [submit]);

  const handleClassChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    // const selected = classList.find((cls) => cls.classId.toString() === e.target.value);
    // console.log(selected);
    // selectedClasses[index] = selected;
    // console.log(selectedClasses);

      const selected = classList.find((cls) => cls.classId.toString() === e.target.value);
      let updatedClasses = [...selectedClasses];
      console.log(updatedClasses);
      updatedClasses[index] = selected!;
      setSelectedClasses(updatedClasses);
      console.log(selectedClasses);

  };

  const handleAddClass = () => {
    if (classForms.length < classList.length) {
      setClassForms([...classForms, classForms.length + 1]);
      setRows([...rows, 2]);
      setCols([...cols, 2]);
      setLayouts([...layouts, [[1, 0], [0, 1]]]);
      setNumSeats([...numSeats, 2]);
    } else {
      console.log("Maximum number of classes reached!");
    }
  };


  const handleRemoveClass = (index: number) => {
    if (classForms.length > 1) {
      const updatedClassForms = [...classForms];
      updatedClassForms.splice(index, 1);
      setClassForms(updatedClassForms);

      const updatedSelectedClasses = [...selectedClasses];
      updatedSelectedClasses.splice(index, 1);
      setSelectedClasses(updatedSelectedClasses);

      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);

      const updatedCols = [...cols];
      updatedCols.splice(index, 1);
      setCols(updatedCols);

      const updatedLayouts = [...layouts];
      updatedLayouts.splice(index, 1);
      setLayouts(updatedLayouts);

      const updatedNumSeats = [...numSeats];
      updatedNumSeats.splice(index, 1);
      setNumSeats(updatedNumSeats);
    } else {
      console.log("At least one class form must be present!");
    }
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
        p={4}
      >
        {/* Remove Class Button */}
        <Flex
          w={"100%"}
          mb={10} 
          justifyContent={"flex-end"}
        >
          <Button
            onClick={() => removalAction.removeFlight(removalAction.key)}
            colorScheme="red"
          >
            <AiOutlineClose />
          </Button>
        </Flex>
    
        <Divider mb={10} />

        {classForms.map((_, index) => (
          <React.Fragment key={index}>
              {/* Class Card Content */}
              <Flex
                  align={"center"}
                  w={"99%"}
                  justifyContent={"space-between"}
                  mb={10} 
              >
                  <Flex alignContent={"center"} w={"100%"} justifyContent="space-between">
                      <Select
                          placeholder="Select Class"
                          value={selectedClasses[index]?.classId || ""}
                          onChange={(e) => handleClassChange(index, e)}
                          w={"70%"}
                      >
                          {classList.map((cls) => (
                              <option 
                                  key={cls.classId} 
                                  value={cls.classId}
                                  disabled={selectedClasses.map(selected => selected?.classId).includes(cls.classId)}
                              >
                                  {cls.className}
                              </option>
                          ))}
                      </Select>
                      {classForms.length > 1 && (
                          <Button 
                              onClick={() => handleRemoveClass(index)} 
                              colorScheme="red" 
                              marginLeft={2}
                              width="14%"
                          >
                              Remove Class
                          </Button>
                      )}
                  </Flex>
              </Flex>
              {/* <Divider mb={10} /> */}
              <LayoutCreation
                row={rows[index]}
                setRow={(value) => {
                  const updatedRows = [...rows];
                  updatedRows[index] = value;
                  setRows(updatedRows);
                }}
                col={cols[index]}
                setCol={(value) => {
                  const updatedCols = [...cols];
                  updatedCols[index] = value;
                  setCols(updatedCols);
                }}
                layout={layouts[index]}
                setLayout={(value) => {
                  const updatedLayouts = [...layouts];
                  updatedLayouts[index] = value;
                  setLayouts(updatedLayouts);
                }}
                numSeat={numSeats[index]}
                setNumSeat={(value) => {
                  const updatedNumSeats = [...numSeats];
                  updatedNumSeats[index] = value;
                  setNumSeats(updatedNumSeats);
                }}
              />
              <Divider my={10} /> 
          </React.Fragment>
        ))}
        
        {/* Add Class Button */}
        <Flex justifyContent="center" mt={4}> 
          <Button 
              onClick={handleAddClass} 
              width="120px" 
              isDisabled={classForms.length >= classList.length}
              _disabled={{ 
                  bgColor: useColorModeValue("gray.400", "gray.600"), 
                  cursor: "not-allowed", 
                  opacity: "0.7" 
              }}
              _hover={{
                  transform: classForms.length >= classList.length ? "none" : "scale(1.05)"
              }}
          >
              Add Class
          </Button>
        </Flex>
        <Divider my={10} />

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
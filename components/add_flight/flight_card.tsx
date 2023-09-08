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
import ShowLayout from "@components/add_flight/show_layout";
import AmountList from "@components/add_flight/amount_list";
import { addNewFlight } from "@public/common/flight_api";
import { class_interface } from "@public/common/flight_interfaces";
import { fetchClassList, fetchFlightLayout } from "@public/common/flight_api";
import { send } from "process";

interface FlightCardProps {
  removalAction: {
    key: string;
    removeFlight: (key: string) => void;
    validateFlight: (key: string, isValid: boolean) => void;
  };
  submit: boolean;
  updateClassesLength: (length: number) => void;
  updateFacilities: (length: number) => void;

}

export default function FlightCard({
  removalAction,
  submit,
  updateClassesLength,
  updateFacilities,
}: FlightCardProps) {
  const [selectedClasses, setSelectedClasses] = useState<class_interface[]>([]);
  const [classForms, setClassForms] = useState<number[]>([1]);
  const [facilities, setFacilities] = useState<string[]>(['']);

  // Initialize states for each class form's properties
  const [rows, setRows] = useState<number[]>([2]);
  const [cols, setCols] = useState<number[]>([2]);
  const [layouts, setLayouts] = useState<number[][][]>([[[1, 0], [0, 1]]]);
  const [numSeats, setNumSeats] = useState<number[]>([2]);


  const [numFlight, setNumFlight] = useState<number>(0);
  const [uniqueFlightId, setUniqueFlightId] = useState<string[]>([]);

  const [fetchedLayouts, setFetchedLayouts] = useState<(number[][] | null)[]>([null]);
  const [fetchedNumSeats, setFetchedNumSeats] = useState<number[]>([0]);

  useEffect(() => {
    console.log(classForms.length);
    console.log(selectedClasses.length);
    updateClassesLength(selectedClasses.length == classForms.length ? selectedClasses.length : 0);
  }, [selectedClasses, classForms]);
  
  useEffect(() => {
    if (facilities.length > 0 && facilities[facilities.length - 1] !== '') {
      updateFacilities(facilities.length);
    } else {
      updateFacilities(0);
    }
    
  }, [facilities]);

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
    let sendingLayouts: number[][][] = [];
    let sendingRows: number[] = [];
    let sendingCols: number[] = [];
    let sendingNumSeats: number[] = [];

    for (let index = 0; index < fetchedLayouts.length; index++) {
        if (fetchedLayouts[index] && fetchedLayouts[index].length > 0) {
            sendingLayouts[index] = fetchedLayouts[index];
            sendingRows[index] = -1;
            sendingCols[index] = -1;
            sendingNumSeats[index] = fetchedNumSeats[index];
        } else {
            sendingLayouts[index] = layouts[index];
            sendingRows[index] = rows[index];
            sendingCols[index] = cols[index];
            sendingNumSeats[index] = numSeats[index];
        }
    }

    if (submit) {
      console.log({
        classes: selectedClasses,
        numFlight: numFlight,
        uniqueFlightId: uniqueFlightId,
        numSeats: sendingNumSeats,
        layouts: sendingLayouts,
        rows: sendingRows,
        cols: sendingCols,
        facilities: facilities,
      })
      addNewFlight({
        classes: selectedClasses,
        numFlight: numFlight,
        uniqueFlightId: uniqueFlightId,
        numSeats: sendingNumSeats,
        layouts: sendingLayouts,
        rows: sendingRows,
        cols: sendingCols,
        facilities: facilities,
      });
    }
  }, [submit]);

  const handleClassChange = async (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = classList.find((cls) => cls.classId.toString() === e.target.value);
    if (selected) {
        let updatedClasses = [...selectedClasses];
        updatedClasses[index] = selected;
        setSelectedClasses(updatedClasses);

        // Fetch the layout for the selected class
        const layoutData = await fetchFlightLayout(selected.classId);

        // Update the fetchedLayouts state
        let updatedFetchedLayouts = [...fetchedLayouts];
        updatedFetchedLayouts[index] = layoutData.layout || null;
        setFetchedLayouts(updatedFetchedLayouts);
        let updatedNumSeats = [...fetchedNumSeats];
        updatedNumSeats[index] = layoutData.numSeat || 0;
        setFetchedNumSeats(updatedNumSeats);
    }
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

  const handleFacilityChange = (index: number, value: string) => {
    const updatedFacilities = [...facilities];
    
    if (value === "") {
        updatedFacilities.splice(index, 1);
    } else {
        updatedFacilities[index] = value;
    }

    // Ensure at least one facility remains
    if (updatedFacilities.length === 0) {
        updatedFacilities.push('');
    }
    
    setFacilities(updatedFacilities);
  };

  const addNewFacility = () => {
    if (facilities[facilities.length - 1]) {
      setFacilities([...facilities, '']);
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

                {fetchedLayouts[index] && fetchedLayouts[index].length > 0 ? (
                    <ShowLayout classId={selectedClasses[index]?.classId} />
                ) : (
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
                )}
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
        
        <VStack align={"left"} spacing={4} w="80%" m={"1rem"}>
          <Text>Facilities</Text>
          {facilities.map((facility, index) => (
            <HStack key={index} spacing={4}>
              <Input 
                value={facility} 
                onChange={(e) => handleFacilityChange(index, e.target.value)} 
                placeholder="Enter a facility"
              />
              {index === facilities.length - 1 && (
                <Button onClick={addNewFacility} isDisabled={!facility}>
                  +
                </Button>
              )}
            </HStack>
          ))}
        </VStack>

        <AmountList
          classes={selectedClasses}
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
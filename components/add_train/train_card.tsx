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
import LayoutCreation from "@components/add_train/layout_creation";
import ShowLayout from "@components/add_train/show_layout";
import AmountList from "@components/add_train/amount_list";
import { addNewTrain } from "@public/common/train_api";
import { coach_interface } from "@public/common/train_interfaces";
import { fetchCoachList, fetchTrainLayout } from "@public/common/train_api";
import { send } from "process";

interface TrainCardProps {
  removalAction: {
    key: string;
    removeTrain: (key: string) => void;
    validateTrain: (key: string, isValid: boolean) => void;
  };
  submit: boolean;
  updateCoachesLength: (length: number) => void;
  updateFacilities: (length: number) => void;

}

export default function TrainCard({
  removalAction,
  submit,
  updateCoachesLength,
  updateFacilities,
}: TrainCardProps) {
  const [selectedCoaches, setSelectedCoaches] = useState<coach_interface[]>([]);
  const [coachForms, setCoachForms] = useState<number[]>([1]);
  const [facilities, setFacilities] = useState<string[]>(['']);

  // Initialize states for each coach form's properties
  const [rows, setRows] = useState<number[]>([2]);
  const [cols, setCols] = useState<number[]>([2]);
  const [layouts, setLayouts] = useState<number[][][]>([[[1, 0], [0, 1]]]);
  const [numSeats, setNumSeats] = useState<number[]>([2]);


  const [numTrain, setNumTrain] = useState<number>(0);
  const [uniqueTrainId, setUniqueTrainId] = useState<string[]>([]);

  const [fetchedLayouts, setFetchedLayouts] = useState<(number[][] | null)[]>([null]);
  const [fetchedNumSeats, setFetchedNumSeats] = useState<number[]>([0]);

  useEffect(() => {
    console.log(coachForms.length);
    console.log(selectedCoaches.length);
    updateCoachesLength(selectedCoaches.length == coachForms.length ? selectedCoaches.length : 0);
  }, [selectedCoaches, coachForms]);
  
  useEffect(() => {
    if (facilities.length > 0 && facilities[facilities.length - 1] !== '') {
      updateFacilities(facilities.length);
    } else {
      updateFacilities(0);
    }
    
  }, [facilities]);

  // Fetching coach list within TrainCard
  const [coachList, setCoachList] = useState<coach_interface[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const coaches = await fetchCoachList();
      setCoachList(coaches);
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
        coaches: selectedCoaches,
        numTrain: numTrain,
        uniqueTrainId: uniqueTrainId,
        numSeats: sendingNumSeats,
        layouts: sendingLayouts,
        rows: sendingRows,
        cols: sendingCols,
        facilities: facilities,
      })
      addNewTrain({
        coaches: selectedCoaches,
        numTrain: numTrain,
        uniqueTrainId: uniqueTrainId,
        numSeats: sendingNumSeats,
        layouts: sendingLayouts,
        rows: sendingRows,
        cols: sendingCols,
        facilities: facilities,
      });
    }
  }, [submit]);

  const handleCoachChange = async (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = coachList.find((cls) => cls.coachId.toString() === e.target.value);
    if (selected) {
        let updatedCoaches = [...selectedCoaches];
        updatedCoaches[index] = selected;
        setSelectedCoaches(updatedCoaches);

        // Fetch the layout for the selected coach
        const layoutData = await fetchTrainLayout(selected.coachId);

        // Update the fetchedLayouts state
        let updatedFetchedLayouts = [...fetchedLayouts];
        updatedFetchedLayouts[index] = layoutData.layout || null;
        setFetchedLayouts(updatedFetchedLayouts);
        let updatedNumSeats = [...fetchedNumSeats];
        updatedNumSeats[index] = layoutData.numSeat || 0;
        setFetchedNumSeats(updatedNumSeats);
    }
  };


  const handleAddCoach = () => {
    if (coachForms.length < coachList.length) {
      setCoachForms([...coachForms, coachForms.length + 1]);
      setRows([...rows, 2]);
      setCols([...cols, 2]);
      setLayouts([...layouts, [[1, 0], [0, 1]]]);
      setNumSeats([...numSeats, 2]);
    } else {
      console.log("Maximum number of coaches reached!");
    }
  };


  const handleRemoveCoach = (index: number) => {
    if (coachForms.length > 1) {
      const updatedCoachForms = [...coachForms];
      updatedCoachForms.splice(index, 1);
      setCoachForms(updatedCoachForms);

      const updatedSelectedCoaches = [...selectedCoaches];
      updatedSelectedCoaches.splice(index, 1);
      setSelectedCoaches(updatedSelectedCoaches);

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
      console.log("At least one coach form must be present!");
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
        {/* Remove Coach Button */}
        <Flex
          w={"100%"}
          mb={10} 
          justifyContent={"flex-end"}
        >
          <Button
            onClick={() => removalAction.removeTrain(removalAction.key)}
            colorScheme="red"
          >
            <AiOutlineClose />
          </Button>
        </Flex>
    
        <Divider mb={10} />

        {coachForms.map((_, index) => (
            <React.Fragment key={index}>
                {/* Coach Card Content */}
                <Flex
                    align={"center"}
                    w={"99%"}
                    justifyContent={"space-between"}
                    mb={10} 
                >
                    <Flex alignContent={"center"} w={"100%"} justifyContent="space-between">
                        <Select
                            placeholder="Select Coach"
                            value={selectedCoaches[index]?.coachId || ""}
                            onChange={(e) => handleCoachChange(index, e)}
                            w={"70%"}
                        >
                            {coachList.map((cls) => (
                                <option 
                                    key={cls.coachId} 
                                    value={cls.coachId}
                                    disabled={selectedCoaches.map(selected => selected?.coachId).includes(cls.coachId)}
                                >
                                    {cls.coachName}
                                </option>
                            ))}
                        </Select>
                        {coachForms.length > 1 && (
                            <Button 
                                onClick={() => handleRemoveCoach(index)} 
                                colorScheme="red" 
                                marginLeft={2}
                                width="14%"
                            >
                                Remove Coach
                            </Button>
                        )}
                    </Flex>
                </Flex>

                {fetchedLayouts[index] && fetchedLayouts[index].length > 0 ? (
                    <ShowLayout coachId={selectedCoaches[index]?.coachId} />
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
        
        {/* Add Coach Button */}
        <Flex justifyContent="center" mt={4}> 
          <Button 
              onClick={handleAddCoach} 
              width="120px" 
              isDisabled={coachForms.length >= coachList.length}
              _disabled={{ 
                  bgColor: useColorModeValue("gray.400", "gray.600"), 
                  cursor: "not-allowed", 
                  opacity: "0.7" 
              }}
              _hover={{
                  transform: coachForms.length >= coachList.length ? "none" : "scale(1.05)"
              }}
          >
              Add Coach
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
          coaches={selectedCoaches}
          numTrain={numTrain}
          setNumTrain={setNumTrain}
          uniqueTrainId={uniqueTrainId}
          setUniqueTrainId={setUniqueTrainId}
          removalAction={removalAction}
        />
      </Flex>
    </>
  );
}
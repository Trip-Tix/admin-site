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
import { use, useState, useEffect } from "react";
import { coach, coachBrands } from "@public/common/bus_interfaces";
import SelectCoachBrand from "@components/add_bus/select_coach_brand";
import ShowLayout from "@components/add_bus/show_layout";
import LayoutCreation from "@components/add_bus/layout_creation";
import AmountList from "@components/add_bus/amount_list";
import { addNewBus } from "@public/common/bus_api";
import ShowFacilities from "./showFacilities";

interface CoachCardProps {
  removalAction: {
    key: string;
    removeCoach: (key: string) => void;
    validateCoach: (key: string, isValid: boolean) => void;
  };
  coachList: coach[];
  coachBrandsList: coachBrands[];
  submit: boolean;
  updateFacilities: (length: number) => void;
}

export default function CoachCard({
  removalAction,
  coachList,
  coachBrandsList,
  submit,
  updateFacilities,
}: CoachCardProps) {
  const [selectedCoach, setSelectedCoach] = useState<coach>();
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [isBrandNew, setIsBrandNew] = useState<boolean>(true);
  const [isSelectingBrand, setIsSelectingBrand] = useState<boolean>(false);
  const [layout, setLayout] = useState<number[][]>([
    [1, 0],
    [0, 1],
  ]);
  const [row, setRow] = useState<number>(2);
  const [col, setCol] = useState<number>(2);
  const [numSeat, setNumSeat] = useState<number>(2);
  const [numBus, setNumBus] = useState<number>(0);
  const [uniqueBusId, setUniqueBusId] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>(['']);

  useEffect(() => {
    if (facilities.length > 0 && facilities[facilities.length - 1] !== '') {
      updateFacilities(facilities.length);
    } else {
      updateFacilities(0);
    }
    
  }, [facilities]);


  useEffect(() => {
    if (submit) {
      addNewBus({
        coachId: selectedCoach?.coachId,
        brandName: selectedBrand,
        alreadyExist: !isBrandNew,
        numBus: numBus,
        uniqueBusId: uniqueBusId,
        numSeat: numSeat,
        layout: layout,
        row: row,
        col: col,
        facilities: facilities,

      });
    }
  }, [submit]);

  useEffect(() => {
    if (selectedCoach && selectedBrand) {
      removalAction.validateCoach(removalAction.key, true);
    } else {
      removalAction.validateCoach(removalAction.key, false);
    }
  }, [selectedCoach, selectedBrand]);

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
    <Flex
      direction="column"
      borderRadius="md"
      overflow="hidden"
      w="100%"
      bg={useColorModeValue("gray.300", "gray.800")}
      boxShadow="md"
    >
      <Flex w="100%" p={5} direction="row-reverse" justifyContent="space-between">
        <Button onClick={() => removalAction.removeCoach(removalAction.key)} colorScheme="red">
          <AiOutlineClose />
        </Button>
        {isSelectingBrand && (
          <Button onClick={() => setIsSelectingBrand(false)}>
            <AiOutlineArrowLeft />
          </Button>
        )}
      </Flex>

      {!isSelectingBrand ? (
        <>
          <SelectCoachBrand
            coachList={coachList}
            coachBrandsList={coachBrandsList}
            selectedCoach={selectedCoach}
            setSelectedCoach={setSelectedCoach}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            isBrandNew={isBrandNew}
            setIsBrandNew={setIsBrandNew}
            setIsSelectingBrand={setIsSelectingBrand}
          />
          <Button
            colorScheme="green"
            onClick={() => setIsSelectingBrand(true)}
            isDisabled={!selectedCoach || !selectedBrand}
            w="100%"
            rightIcon={<AiOutlineArrowRight />}
            borderRadius={0}
          />
        </>
      ) : (
        <>
          <Flex align="right" w="100%" justifyContent="space-between" p={2}>
            <Flex alignContent="center">
              <Text fontWeight="bold" mr={2}>Coach:</Text>
              <Text fontStyle="italic">{selectedCoach.coachName}</Text>
            </Flex>
            <Flex alignContent="center">
              <Text fontWeight="bold" mr={2}>Brand:</Text>
              <Text fontStyle="italic">{selectedBrand}</Text>
            </Flex>
          </Flex>
          <Divider />
          {isBrandNew ? (
            <>
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
              <VStack align="left" spacing={4} w="80%" m="1rem">
                <Text>Facilities</Text>
                {facilities.map((facility, index) => (
                  <HStack key={index} spacing={4}>
                    <Input 
                      value={facility} 
                      onChange={(e) => handleFacilityChange(index, e.target.value)} 
                      placeholder="Enter a facility"
                    />
                    {index === facilities.length - 1 && (
                      <Button onClick={addNewFacility} isDisabled={!facility}>+</Button>
                    )}
                  </HStack>
                ))}
              </VStack>
            </>
          ) : (
            <>
              <ShowLayout coachId={selectedCoach?.coachId} brandName={selectedBrand} />
              <ShowFacilities 
                facilities={facilities}
                setFacilities={setFacilities} 
                coachId={selectedCoach?.coachId} 
                brandName={selectedBrand} />
            </>
          )}
          <Divider />
          {isSelectingBrand && (
            <AmountList
              coachName={selectedCoach?.coachName}
              coachId={selectedCoach?.coachId}
              brandName={selectedBrand}
              numBus={numBus}
              setNumBus={setNumBus}
              uniqueBusId={uniqueBusId}
              setUniqueBusId={setUniqueBusId}
              removalAction={removalAction}
            />
          )}
        </>
      )}
    </Flex>
  );
}
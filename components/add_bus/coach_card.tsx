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

interface CoachCardProps {
  removalAction: {
    key: string;
    removeCoach: (key: string) => void;
    validateCoach: (key: string, isValid: boolean) => void;
  };
  coachList: coach[];
  coachBrandsList: coachBrands[];
  submit: boolean;
}

export default function CoachCard({
  removalAction,
  coachList,
  coachBrandsList,
  submit,
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

  useEffect(() => {
    if (submit) {
      console.log("submitting");
      console.log({
        coachId: selectedCoach?.coachId,
        brandName: selectedBrand,
        isBrandNew: isBrandNew,
        row: row,
        col: col,
        numSeat: numSeat,
        layout: layout,
        numBus: numBus,
        uniqueBusId: uniqueBusId,
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

  return (
    <>
      <VStack
        borderRadius={"md"}
        overflow="hidden"
        maxW={"100%"}
        bg={useColorModeValue("gray.300", "gray.800")}
        spacing={0}
        boxShadow={"md"}
      >
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
              w={"100%"}
              rightIcon={<AiOutlineArrowRight />}
              borderRadius={0}
            />
          </>
        ) : (
          <>
            {" "}
            <VStack w={"100%"} h={"100%"} p={5}>
              <Flex justifyContent={"space-between"} w={"100%"}>
                <Flex align={"right"} direction={"column"} w={"100%"} mr={5}>
                  <Flex alignContent={"center"}>
                    <Text fontWeight={"bold"} mr={2}>
                      Coach:
                    </Text>
                    <Text fontStyle={"italic"}>{selectedCoach.coachName}</Text>
                  </Flex>
                  <Flex alignContent={"center"}>
                    <Text fontWeight={"bold"} mr={2}>
                      Brand:{" "}
                    </Text>
                    <Text fontStyle={"italic"}>{selectedBrand}</Text>
                  </Flex>
                </Flex>
                <Button onClick={() => setIsSelectingBrand(false)}>
                  <AiOutlineArrowLeft />
                </Button>
              </Flex>
              <Divider />
            </VStack>
            {isBrandNew ? (
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
            ) : (
              <ShowLayout
                coachId={selectedCoach?.coachId}
                brandName={selectedBrand}
              />
            )}
          </>
        )}
        {isSelectingBrand && (
          <AmountList
            coachId={selectedCoach?.coachId}
            brandName={selectedBrand}
            numBus={numBus}
            setNumBus={setNumBus}
            uniqueBusId={uniqueBusId}
            setUniqueBusId={setUniqueBusId}
          />
        )}
        <Button
          onClick={() => removalAction.removeCoach(removalAction.key)}
          w={"100%"}
          colorScheme="red"
          rightIcon={<AiOutlineClose />}
          borderTopEndRadius={0}
          borderTopStartRadius={0}
        />
      </VStack>
    </>
  );
}

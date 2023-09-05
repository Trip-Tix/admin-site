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
import { class_interface, classBrands } from "@public/common/flight_interfaces";
import SelectClassBrand from "@components/add_flight/select_class_brand";
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
  classBrandsList: classBrands[];
  submit: boolean;
}

export default function ClassCard({
  removalAction,
  classList,
  classBrandsList,
  submit,
}: ClassCardProps) {
  const [selectedClass, setSelectedClass] = useState<class_interface>();
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
  const [numFlight, setNumFlight] = useState<number>(0);
  const [uniqueFlightId, setUniqueFlightId] = useState<string[]>([]);

  useEffect(() => {
    if (submit) {
      addNewFlight({
        classId: selectedClass?.classId,
        brandName: selectedBrand,
        alreadyExist: !isBrandNew,
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
    if (selectedClass && selectedBrand) {
      removalAction.validateClass(removalAction.key, true);
    } else {
      removalAction.validateClass(removalAction.key, false);
    }
  }, [selectedClass, selectedBrand]);

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
          {isSelectingBrand && (
            <Button onClick={() => setIsSelectingBrand(false)}>
              <AiOutlineArrowLeft />
            </Button>
          )}
        </Flex>
        {/* Class Card Content */}
        {!isSelectingBrand ? (
          <>
            <SelectClassBrand
              classList={classList}
              classBrandsList={classBrandsList}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              isBrandNew={isBrandNew}
              setIsBrandNew={setIsBrandNew}
              setIsSelectingBrand={setIsSelectingBrand}
            />
            <Button
              colorScheme="green"
              onClick={() => setIsSelectingBrand(true)}
              isDisabled={!selectedClass || !selectedBrand}
              w={"100%"}
              rightIcon={<AiOutlineArrowRight />}
              borderRadius={0}
            />
          </>
        ) : (
          <>
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
                <Text fontStyle={"italic"}>{selectedClass.className}</Text>
              </Flex>
              <Flex alignContent={"center"}>
                <Text fontWeight={"bold"} mr={2}>
                  Brand:{" "}
                </Text>
                <Text fontStyle={"italic"}>{selectedBrand}</Text>
              </Flex>
            </Flex>
            <Divider />
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
                classId={selectedClass?.classId}
                brandName={selectedBrand}
              />
            )}
          </>
        )}
        <Divider />
        {isSelectingBrand && (
          <AmountList
            className={selectedClass?.className}
            classId={selectedClass?.classId}
            brandName={selectedBrand}
            numFlight={numFlight}
            setNumFlight={setNumFlight}
            uniqueFlightId={uniqueFlightId}
            setUniqueFlightId={setUniqueFlightId}
            removalAction={removalAction}
          />
        )}
      </Flex>
    </>
  );
}

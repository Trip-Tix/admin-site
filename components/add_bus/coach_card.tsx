import { Flex, VStack, Divider, Button, Heading, Box, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CoachInfoContext } from "@public/common/context";

import SelectCoach from "@components/add_bus/select_coach";
import SelectRow from "@components/add_bus/select_row";
import SelectColumn from "@components/add_bus/select_column";
import SelectAmount from "@components/add_bus/select_amount";
import SeatLayout from "@components/add_bus/seat_layout";

interface CoachCardProps {
  ChildrenButton: React.ReactNode;
}


export default function CoachCard({ ChildrenButton }: CoachCardProps) {
  const [coachName, setCoachName] = useState("");
  const [availableNumber, setAvailableNumber] = useState(1);
  const [row, setRow] = useState(2);
  const [column, setColumn] = useState(2);
  const [layout, setLayout] = useState<number[][]>([
    [1, 0],
    [0, 1],
  ]);
  const [availableSeat, setAvailableSeat] = useState<number>(2);
  const [coachSelected, setCoachSelected] = useState(false);
  return (
    <CoachInfoContext.Provider
      value={{
        coachName,
        setCoachName,
        availableNumber,
        setAvailableNumber,
        row,
        setRow,
        column,
        setColumn,
        layout,
        setLayout,
        availableSeat,
        setAvailableSeat,
      }}
    >
      
        {!coachSelected ? (
          <SelectCoach coachSelected={coachSelected} setCoachSelected={setCoachSelected} />
        ) : (
          <Flex justifyContent={"space-between"} w={"full"} borderRadius={5}>
            <VStack spacing={5} align={""}>
              <Heading size="md">Coach: {coachName}</Heading>
              {ChildrenButton}
              <SelectRow />
              <SelectColumn />
              <SelectAmount />
            </VStack>
            <Divider orientation="vertical" />
            <SeatLayout />
          </Flex>
        )}
      
    </CoachInfoContext.Provider>
  );
}

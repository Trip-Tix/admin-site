import {
  Box,
  Button,
  Input,
  List,
  Text,
  Select,
  VStack,
} from "@chakra-ui/react";
import { use, useState, useEffect } from "react";
import { coach, coachBrands } from "@public/common/bus_interfaces";
import SelectCoachBrand from "@components/add_bus/select_coach_brand";
import ShowLayout from "@components/add_bus/show_layout";
import LayoutCreation from "@components/add_bus/layout_creation";
import AmountList from "@components/add_bus/amount_list";

interface CoachCardProps {
  coachKey: string;
  removeCoach: (key: string) => void;
  coachList: coach[];
  coachBrandsList: coachBrands[];
}

export default function CoachCard({
  coachKey,
  removeCoach,
  coachList,
  coachBrandsList,
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

  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
        {!isSelectingBrand ? (
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
        ) : (
          <>
            <Text>The Thing is : {isBrandNew ? "New" : "Old"}</Text>
            <Button onClick={() => setIsSelectingBrand(false)}>Back</Button>
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
        <Button variant="outline" onClick={() => removeCoach(coachKey)}>
          Remove
        </Button>
      </Box>
    </>
  );
}

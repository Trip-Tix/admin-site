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
        <Button
          variant="outline"
          onClick={() => removalAction.removeCoach(removalAction.key)}
        >
          Remove
        </Button>
      </Box>
    </>
  );
}

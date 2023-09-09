import List from "@components/list_train/list";
import { TrainInfoContext } from "@public/common/context";
import { HStack } from "@chakra-ui/react";
import Details from "@components/list_train/details";
import { useState } from "react";

export default function MainData() {
  const [uniqueTrainId, setUniqueTrainId] = useState<string>("0");
  const [coachNames, setCoachNames] = useState<string[]>([""]);
  const [coachIds, setCoachIds] = useState<number[]>([0]);
  const [layout, setLayout] = useState<number[][][]>([]);
  const [numSeat, setNumSeat] = useState<number[]>([0]);
  const [trainLayoutId, setTrainLayoutId] = useState<number[]>([0]);
  const [facilities, setFacilities] = useState<string[]>([""]);

  
  return (
    <TrainInfoContext.Provider value={{ 
      uniqueTrainId, setUniqueTrainId,
      coachNames, setCoachNames,
      coachIds, setCoachIds,
      layout, setLayout,
      numSeat, setNumSeat,
      trainLayoutId, setTrainLayoutId,
      facilities, setFacilities,
    }}>
      <HStack spacing="4" align="stretch">
        <List />
        <Details />
      </HStack>
    </TrainInfoContext.Provider>
  );
}

import List from "@components/list_bus/list";
import Details from "@components/list_bus/details";
import { BusInfoContext } from "@public/common/context";
import { HStack } from "@chakra-ui/react";

import { useState } from "react";

export default function MainData() {
  const [coachId, setCoachId] = useState<number>(0);
  const [coachName, setCoachName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [layout, setLayout] = useState<number[][]>([]);
  const [busLayoutId, setBusLayoutId] = useState<number>(0);
  const [numSeat, setNumSeat] = useState<number>(0);
  const [numBus, setNumBus] = useState<number>(0);


  return (
    <BusInfoContext.Provider value={{ 
      coachId, setCoachId,
      coachName, setCoachName,
      brandName, setBrandName,
      layout, setLayout,
      busLayoutId, setBusLayoutId,
      numSeat, setNumSeat,
      numBus, setNumBus,
    }}>
      <HStack spacing="4" align="stretch">
        <List />
        <Details />
      </HStack>
    </BusInfoContext.Provider>
  );
}

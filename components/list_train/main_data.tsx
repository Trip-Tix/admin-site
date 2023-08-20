import List from "@components/list_train/list";
import Details from "@components/list_train/details";
import { TrainInfoContext } from "@public/common/context";
import { HStack } from "@chakra-ui/react";

import { useState } from "react";

export default function MainData() {
  const [trainId, setTrainId] = useState<string>("");
  const [coachId, setCoachId] = useState<string>("");

  return (
    <TrainInfoContext.Provider value={{ trainId, setTrainId, coachId, setCoachId }}>
      <HStack spacing="4" align="stretch">
        <List />
        <Details />
      </HStack>
    </TrainInfoContext.Provider>
  );
}

import List from "@components/list_bus/list";
import Details from "@components/list_bus/details";
import { BusInfoContext } from "@public/common/context";

import { useContext, createContext, useState } from "react";

// from list to detail we need to pass the bus id and coach id
// so we need to use context api
// list needs to use setBusId and setCoachId
// details needs to use busId and coachId
// if context is null, in details we do not call any api

export default function MainData() {
  const [busId, setBusId] = useState<string>("");
  const [coachId, setCoachId] = useState<string>("");

  return (
    <BusInfoContext.Provider value={{ busId, setBusId, coachId, setCoachId }}>
      <List />
      <Details />
    </BusInfoContext.Provider>
  );
}

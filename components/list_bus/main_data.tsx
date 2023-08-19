import List from "@components/list_bus/list";
import Details from "@components/list_bus/details";
import { BusInfoContext } from "@public/common/context";

import { useContext, createContext, useState } from "react";

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

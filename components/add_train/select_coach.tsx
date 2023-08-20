import React, { useContext, useEffect, useState } from "react";
import { CoachInfoContext } from "@public/common/context";
import { TrainAddContext } from "@public/common/context";
import { getAllCoachesTrain, getCoachNameTrain } from "@public/common/api";
import axios from "axios";
import { VStack, Select } from "@chakra-ui/react";

interface SelectedCoachProps {
  coachSelected: boolean;
  setCoachSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectCoach({
  coachSelected,
  setCoachSelected,
}: SelectedCoachProps) {
  const { coachName, setCoachName } = useContext(CoachInfoContext);
  const [coachNames, setCoachNames] = useState<string[]>([]);
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const fetchCoachNames = async () => {
      setUserToken(sessionStorage.getItem("user-token"));
      try {
        const response = await axios.post(getAllCoachesTrain, null, {
          headers: {
            usertoken: userToken,
          },
        });
        if (response.status === 200) {
          setCoachNames(response.data);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching coach names:",
          error,
          "component/add_train/select_coach.tsx"
        );
      }
    };
    fetchCoachNames();
  }, [userToken]);

  useEffect(() => {
    if (coachName !== "") {
      setCoachSelected(true);
    } else {
      setCoachSelected(false);
    }
  }, [coachName, setCoachSelected]);

  return (
    <Select
      placeholder="Select Coach"
      onChange={(e) => setCoachName(e.target.value)}
    >
      {coachNames.map((coachName) => (
        <option key={coachName} value={coachName}>
          {coachName}
        </option>
      ))}
    </Select>
  );
}

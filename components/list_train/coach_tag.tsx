import { Tag } from "@chakra-ui/react";
import { getCoachNameTrain } from "@public/common/api";
import axios from "axios";
import { useState, useEffect } from "react";

interface CoachTagProps {
  coachId: string;
}

export default function CoachTag({ coachId }: CoachTagProps) {
  const coachColorMap = {
    Luxury: "green",
    Standard: "blue",
    Premium: "purple",
    AC: "red",
    Seat: "orange",
    Sleeper: "gray",
  };
  const [coachName, setCoachName] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(
          getCoachNameTrain,
          {
            coachId: coachId,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );
        if (response.status === 200) {
          setCoachName(response.data);
        } else {
          console.error(
            "Failed to fetch coach name",
            "component/list_train/coach_tag.tsx",
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching coach name:",
          error,
          "component/list_train/coach_tag.tsx",
        );
      }
    };
    fetchData();
  }, [coachId, userToken]);

  return (
    <Tag size="md" variant="solid" colorScheme={coachColorMap[coachName]}>
      {coachName}
    </Tag>
  );
}

import { Tag } from "@chakra-ui/react";
import { getClassNameBus } from "@public/common/api";
import axios from "axios";
import { useState, useEffect } from "react";

interface ClassTagProps {
  classId: string;
}

export default function ClassTag({ classId }: ClassTagProps) {
  const classColorMap = {
    Luxury: "green",
    Standard: "blue",
    Premium: "purple",
    AC: "red",
    Seat: "orange",
    Sleeper: "gray",
  };
  const [className, setClassName] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(
          getClassNameBus,
          {
            classId: classId,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );
        if (response.status === 200) {
          setClassName(response.data);
        } else {
          console.error(
            "Failed to fetch class name",
            "component/list_bus/class_tag.tsx",
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching class name:",
          error,
          "component/list_bus/class_tag.tsx",
        );
      }
    };
    fetchData();
  }, [classId, userToken]);

  return (
    <Tag size="md" variant="solid" colorScheme={classColorMap[className]}>
      {className}
    </Tag>
  );
}

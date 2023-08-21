import React, { useContext, useEffect, useState } from "react";
import { ClassInfoContext } from "@public/common/context";
import { FlightAddContext } from "@public/common/context";
import { getAllClassesFlight, getClassNameFlight } from "@public/common/api";
import axios from "axios";
import { VStack, Select } from "@chakra-ui/react";

interface SelectedClassProps {
  classSelected: boolean;
  setClassSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectClass({
  classSelected,
  setClassSelected,
}: SelectedClassProps) {
  const { className, setClassName } = useContext(ClassInfoContext);
  const [classNames, setClassNames] = useState<string[]>([]);
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const fetchClassNames = async () => {
      setUserToken(sessionStorage.getItem("user-token"));
      try {
        const response = await axios.post(getAllClassesFlight, null, {
          headers: {
            usertoken: userToken,
          },
        });
        if (response.status === 200) {
          setClassNames(response.data);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching class names:",
          error,
          "component/add_flight/select_class.tsx"
        );
      }
    };
    fetchClassNames();
  }, [userToken]);

  useEffect(() => {
    if (className !== "") {
      setClassSelected(true);
    } else {
      setClassSelected(false);
    }
  }, [className, setClassSelected]);

  return (
    <Select
      placeholder="Select Class"
      onChange={(e) => setClassName(e.target.value)}
    >
      {classNames.map((className) => (
        <option key={className} value={className}>
          {className}
        </option>
      ))}
    </Select>
  );
}

import {
  Flex,
  VStack,
  Divider,
  Button,
  Heading,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { ClassInfoContext } from "@public/common/context";
import { FlightAddContext } from "@public/common/context";
import { useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { postAddFlight } from "@public/common/api";
import { list_flight_url } from "@public/common/pagelinks";

import SelectClass from "@components/add_flight/select_class";
import SelectRow from "@components/add_flight/select_row";
import SelectColumn from "@components/add_flight/select_column";
import SelectAmount from "@components/add_flight/select_amount";
import SeatLayout from "@components/add_flight/seat_layout";

interface ClassCardProps {
  ChildrenButton: React.ReactNode;
}

export default function ClassCard({ ChildrenButton }: ClassCardProps) {
  const [className, setClassName] = useState("");
  const [availableNumber, setAvailableNumber] = useState(1);
  const [row, setRow] = useState(2);
  const [column, setColumn] = useState(2);
  const [layout, setLayout] = useState<number[][]>([
    [1, 0],
    [0, 1],
  ]);
  const [availableSeat, setAvailableSeat] = useState<number>(2);
  const [classSelected, setClassSelected] = useState(false);
  const { submit, flightName } = useContext(FlightAddContext);
  const [userToken, setUserToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const sendData = async () => {
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(
          postAddFlight,
          {
            flightName,
            className,
            availableNumber,
            row,
            column,
            layout,
            availableSeat,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );
        if (response.status === 200) {
          console.log("Flight added successfully");
          router.push(list_flight_url);
        } else {
          console.error(
            "Failed to add flight",
            "component/add_flight/class_card.tsx",
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while adding flight:",
          error,
          "component/add_flight/class_card.tsx",
        );
      }
    };
    if (submit) {
      sendData();
    }
  }, [submit, userToken]);

  return (
    <ClassInfoContext.Provider
      value={{
        className,
        setClassName,
        availableNumber,
        setAvailableNumber,
        row,
        setRow,
        column,
        setColumn,
        layout,
        setLayout,
        availableSeat,
        setAvailableSeat,
      }}
    >
      {!classSelected ? (
        <SelectClass
          classSelected={classSelected}
          setClassSelected={setClassSelected}
        />
      ) : (
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          w={"full"}
          borderRadius={5}
          p={5}
          bg={useColorModeValue("gray.300", "gray.700")}
        >
          <VStack spacing={5} align="left">
            <Heading size="md">Class: {className}</Heading>
            {ChildrenButton}
            <SelectRow />
            <SelectColumn />
            <SelectAmount />
          </VStack>
          <Divider orientation="vertical" />
          <SeatLayout />
        </Flex>
      )}
    </ClassInfoContext.Provider>
  );
}

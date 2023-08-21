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
import { CoachInfoContext } from "@public/common/context";
import { BusAddContext } from "@public/common/context";
import { useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { postAddBus } from "@public/common/server_api";
import { list_bus_url } from "@public/common/pagelinks";

import SelectCoach from "@components/add_bus/select_coach";
import SelectRow from "@components/add_bus/select_row";
import SelectColumn from "@components/add_bus/select_column";
import SelectAmount from "@components/add_bus/select_amount";
import SeatLayout from "@components/add_bus/seat_layout";

interface CoachCardProps {
  ChildrenButton: React.ReactNode;
}

export default function CoachCard({ ChildrenButton }: CoachCardProps) {
  const [coachName, setCoachName] = useState("");
  const [availableNumber, setAvailableNumber] = useState(1);
  const [row, setRow] = useState(2);
  const [column, setColumn] = useState(2);
  const [layout, setLayout] = useState<number[][]>([
    [1, 0],
    [0, 1],
  ]);
  const [availableSeat, setAvailableSeat] = useState<number>(2);
  const [coachSelected, setCoachSelected] = useState(false);
  const { submit, busName } = useContext(BusAddContext);
  const [userToken, setUserToken] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const sendData = async () => {
      setUserToken(sessionStorage.getItem("user-token") || "");
      setUsername(sessionStorage.getItem("username") || "");
      
      const usernameArray: string[] = [];
      usernameArray.push(username);
      try {
        const response = await axios.post(
          postAddBus,
          {
            busName,
            coachName,
            availableNumber,
            row,
            column,
            layout,
            availableSeat,
            adminUsernameArray: usernameArray,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );
        if (response.status === 200) {
          console.log("Bus added successfully");
          router.push(list_bus_url);
        } else {
          console.error(
            "Failed to add bus",
            "component/add_bus/coach_card.tsx",
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while adding bus:",
          error,
          "component/add_bus/coach_card.tsx",
        );
      }
    };
    if (submit) {
      sendData();
    }
  }, [submit, userToken]);

  // useEffect(() => {
  //   console.log({
  //     coachName,
  //     availableNumber,
  //     row,
  //     column,
  //     layout,
  //     availableSeat,
  //   });
  //   }, [ coachName, availableNumber, row, column, layout, availableSeat ]);

  return (
    <CoachInfoContext.Provider
      value={{
        coachName,
        setCoachName,
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
      {!coachSelected ? (
        <SelectCoach
          coachSelected={coachSelected}
          setCoachSelected={setCoachSelected}
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
            <Heading size="md">Coach: {coachName}</Heading>
            {ChildrenButton}
            <SelectRow />
            <SelectColumn />
            <SelectAmount />
          </VStack>
          <Divider orientation="vertical" />
          <SeatLayout />
        </Flex>
      )}
    </CoachInfoContext.Provider>
  );
}

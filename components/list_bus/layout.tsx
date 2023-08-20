import { Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getBusLayout } from "@public/common/api";
import { Spinner } from "@chakra-ui/react";

import Seat from "@components/list_bus/seat";

interface LayoutProps {
  busId: string;
  coachId: string;
}

export default function Layout({ busId, coachId }: LayoutProps) {
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [layout, setLayout] = useState([[]]);
  const [RowArray, setRowArray] = useState(Array.from(Array(row).keys()));
  const [ColumnArray, setColumnArray] = useState(
    Array.from(Array(column).keys()),
  );
  const [userToken, setUserToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(
          getBusLayout,
          {
            busId: busId,
            coachId: coachId,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );
        if (response.status == 200) {
          const { row, col, layout } = response.data;
          setRow(row);
          setColumn(col);
          setLayout(layout);
          setRowArray(Array.from(Array(row).keys()));
          setColumnArray(Array.from(Array(column).keys()));
        } else {
          console.error(
            response.status,
            response.data,
            "component/list_bus/details/Details.tsx",
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [busId, coachId, userToken]);

  return (
    <Flex
      direction="column"
      align="stretch"
      width={"100%"}
      background={useColorModeValue("gray.100", "gray.700")}
      borderRadius="0.5rem"
      padding={4}
      boxShadow="md"
    >
      <HStack spacing={4} align="center">
        <Text>Layout</Text>
        <Divider orientation="vertical" />
        {loading ? (
          <Spinner />
        ) : (
          <VStack spacing={1}>
            {RowArray.map((row) => (
              <HStack spacing={1} key={row}>
                {ColumnArray.map((column) => (
                  <Seat exists={layout[row][column] === 1} key={column} />
                ))}
                <Text ml={"10px"}>Row {row}</Text>
              </HStack>
            ))}
          </VStack>
        )}
      </HStack>
    </Flex>
  );
}

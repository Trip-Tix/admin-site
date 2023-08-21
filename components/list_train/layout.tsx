import { Flex, HStack, Text, VStack, Box } from "@chakra-ui/layout";
import { Divider, Spinner } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTrainLayout } from "@public/common/api";
import Seat from "@components/seat";

interface LayoutProps {
  trainId: string;
  coachId: string;
}

export default function Layout({ trainId, coachId }: LayoutProps) {
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [layout, setLayout] = useState<number[][]>([]);
  const [RowArray, setRowArray] = useState<number[]>([]);
  const [ColumnArray, setColumnArray] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userToken = "your_user_token";
        const response = await axios.post(
          getTrainLayout,
          {
            trainId: trainId,
            coachId: coachId,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );
        if (response.status === 200) {
          const { row, col, layout } = response.data;
          setRow(row);
          setColumn(col);
          setLayout(layout);
          setRowArray(Array.from(Array(row).keys()));
          setColumnArray(Array.from(Array(column).keys()));
        } else {
          console.error(response.status, response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [trainId, coachId]);

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
          // <VStack spacing={1}>
          //   {RowArray.map((row) => (
          //     <HStack spacing={1} key={row}>
          //       {ColumnArray.map((column) => (
          //         <Seat exists={layout[row][column] === 1} key={column} />
          //       ))}
          //       <Text ml={"10px"}>Row {row}</Text>
          //     </HStack>
          //   ))}
          // </VStack>
          <VStack spacing={1}>
              {layout.map((row, rowIndex) => (
                <HStack spacing={1} key={rowIndex}>
                  {row.map((item, columnIndex) => (
                  <Box key={columnIndex} background={item === 0? "white" : "gray.500"} w={2} h ={2} borderRadius={2} visibility={item === 0? "hidden" : "visible"}/>
                  ))} 
                </HStack>
              ))
              }
            </VStack>
        )}
      </HStack>
    </Flex>
  );
}

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllTrain } from "@public/common/api";
import axios from "axios";
import TableItem from "@components/list_train/table_item";

interface TrainInfo {
  trainName: string;
  trainId: string;
  coachId: string;
  amount: number;
}

export default function List() {
  const [trainInfoList, setTrainInfoList] = useState<TrainInfo[]>([]);
  const [TrainInfoLoading, setTrainInfoLoading] = useState(true);
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    async function fetchTrainInfo() {
      setTrainInfoLoading(true);
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(getAllTrain, null, {
          headers: {
            usertoken: userToken,
          },
        });

        if (response.status === 200) {
          setTrainInfoList(response.data);
        } else {
          console.error(
            "Failed to fetch train information",
            "component/list_train/list.tsx",
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching train information:",
          error,
          "component/list_train/list.tsx",
        );
      }
      setTrainInfoLoading(false);
    }
    fetchTrainInfo();
  }, [userToken]);

  return (
    <VStack spacing={4} align="stretch" flex={1} ml={10} mr={10}>
      <Heading as="h1" size="lg" color="primary.800">
        List of Trains
      </Heading>
      {TrainInfoLoading ? (
        <>
          <Heading as="h2" size="md" color="primary.800">
            Loading...
          </Heading>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Train Name</Th>
                <Th>Train ID</Th>
                <Th>Coach Type</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {trainInfoList.map((train) => (
                <TableItem
                  key={train.trainId}
                  name={train.trainName}
                  trainId={train.trainId}
                  coachId={train.coachId}
                  amount={train.amount}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
}



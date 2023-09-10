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
  useColorModeValue,
  Tag,
  Button,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { TrainInfoContext } from "@public/common/context";
import { uniqueTrainEntry } from "@public/common/train_interfaces";
import { fetchAllTrainToList, setTrainStatus } from "@public/common/train_api";

export default function List() {
  const [trainInfoLoading, setTrainInfoLoading] = useState<boolean>(true);
  const [trainInfo, setTrainInfo] = useState<uniqueTrainEntry[]>([]);
  const {
    setUniqueTrainId,
    setCoachNames,
    setCoachIds,
    setLayout,
    setNumSeat,
    setTrainLayoutId,
    setFacilities,
    setStatus,
  } = useContext(TrainInfoContext);

  useEffect(() => {
    fetchAllTrainToList().then((res) => {
      setTrainInfo(res);
      setTrainInfoLoading(false);
    });
  }, []);

  const handleClick = (train: uniqueTrainEntry) => {
    console.log(train);
    setUniqueTrainId(train.uniqueTrainId);
    setCoachNames(train.coachNames);
    setCoachIds(train.coachIds);
    setLayout(train.layout);
    setNumSeat(train.numSeat);
    setTrainLayoutId(train.trainLayoutId);
    setFacilities(train.facilities);
    setStatus(train.status)
  };

  const hoverBackgroundColor = useColorModeValue("gray.200", "gray.600");

  async function handleStatusChange(uniqueTrainId: string, status: number) {
    try {
        setTrainInfoLoading(true);
        const message = await setTrainStatus({
            unique_train_id: uniqueTrainId,
            status: status
        });

        setTrainInfo(prevTrains => {
          return prevTrains.map(train => {
              if (train.uniqueTrainId === uniqueTrainId) {
                  return { ...train, status: status };
              }
              return train;
          });
        });
        setTrainInfoLoading(false);

        console.log(message);

    } catch (error) {
        console.error("Error updating train status:", error);
    }
  }

  return (
    <VStack spacing={4} align="stretch" flex={1} ml={10} mr={10}>
      <Heading as="h1" size="lg" color="primary.800">
        List of Trains
      </Heading>
      {trainInfoLoading ? (
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
                <Th>Coaches</Th>
                <Th>Facilities</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {trainInfo.map((train, index) => (
                <Tr
                  key={index}
                  onClick={() => handleClick(train)}
                  cursor={"pointer"}
                  _hover={{
                    background: hoverBackgroundColor,
                  }}
                >
                  <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>{train.uniqueTrainId}</Td>
                  <Td style={{ whiteSpace: 'normal', maxWidth: '200px', paddingTop: '10px', paddingBottom: '10px' }}>
                    {train.coachNames.map((coachName, idx) => (
                      <Tag key={idx} size="md" borderRadius="md" variant="solid" colorScheme="teal" mr={4} mt={2} mb={2}>
                        {coachName}
                      </Tag>
                    ))}
                  </Td>
                  <Td style={{ whiteSpace: 'normal', maxWidth: '200px', paddingTop: '10px', paddingBottom: '10px' }}>
                    {train.facilities.map((facility, idx) => (
                      <Tag key={idx} size="md" borderRadius="md" variant="solid" colorScheme="green" mr={4} mt={2} mb={2}>
                        {facility}
                      </Tag>
                    ))}
                  </Td>
                  <Td style={{ paddingTop: '10px', paddingBottom: '10px', textAlign: 'center' }}>
                      {train.status === 1 ? (
                          <Tag size="lg" width="100%" borderRadius="md" variant="solid" colorScheme="green" display="flex" justifyContent="center" alignItems="center">
                              Active
                          </Tag>
                      ) : (
                          <Tag size="lg" width="100%" borderRadius="md" variant="solid" colorScheme="red" display="flex" justifyContent="center" alignItems="center">
                              Inactive
                          </Tag>
                      )}
                  </Td>
                  <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    {train.status === 1 ? (
                      <Button style={{ height: '35px', width: '100%' }} 
                      colorScheme="red" onClick={() => handleStatusChange(train.uniqueTrainId, 0)}>
                        Set Inactive
                      </Button>
                    ) : (
                      <Button style={{ height: '35px', width: '100%' }} 
                      colorScheme="green" onClick={() => handleStatusChange(train.uniqueTrainId, 1)}>
                        Set Active
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </VStack>
  );
}

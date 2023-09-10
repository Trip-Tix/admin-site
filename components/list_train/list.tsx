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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { TrainInfoContext } from "@public/common/context";
import { uniqueTrainEntry } from "@public/common/train_interfaces";
import { fetchAllTrainToList } from "@public/common/train_api";

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
                  <Td style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    {train.status === 1 ? (
                      <Tag size="md" borderRadius="md" variant="solid" colorScheme="green">
                        Active
                      </Tag>
                    ) : (
                      <Tag size="md" borderRadius="md" variant="solid" colorScheme="red">
                        Inactive
                      </Tag>
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

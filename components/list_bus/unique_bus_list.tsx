import { fetchAllUniqueBusId, setBusStatus } from "@public/common/bus_api";
import { useState, useEffect } from "react";
import { FaBus, FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";

import {
  Flex,
  useColorModeValue,
  Spinner,
  List,
  ListItem,
  Text,
  Divider,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Icon,
  Grid,
} from "@chakra-ui/react";
import { FaPlus, FaPlusSquare } from "react-icons/fa";
import { AiFillFlag, AiFillPlusSquare, AiOutlineArrowDown } from "react-icons/ai";

interface BusIdProps {
  coachId: number;
  brandName: string;
  onBusClick: (busId: string) => void;
  activeBusId: string | null;
  schedules: any[];
  loadingSchedules: boolean;
}

export default function UniqueBusList({ coachId, brandName, onBusClick, activeBusId, schedules, loadingSchedules }: BusIdProps) {
  const [busList, setBusList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<number[]>([0]); // 0: inactive, 1: active

  
  
  const bgColor = useColorModeValue("gray.300", "gray.800");
  const borderColor = useColorModeValue("gray.400", "gray.700");
  const hoverBorderColor = useColorModeValue("gray.500", "gray.600");
  const optionColor = useColorModeValue("gray.800", "gray.200");


  useEffect(() => {
    setLoading(true);
    fetchAllUniqueBusId({ coachId, brandName }).then((res) => {
      setBusList(res.map((bus) => bus.uniqueBusId));
      setStatus(res.map((bus) => bus.status));
      setLoading(false);
    });
  }, [coachId, brandName]);

  const onClose = () => setIsOpen(false);

  const openSchedule = (busId: string) => {
    onBusClick(busId); // Handle the bus click
    setIsScheduleOpen(true); // Open the schedule modal
  };

  const closeSchedule = () => {
    setIsScheduleOpen(false);
    onBusClick(null); // Reset the activeBusId
  };

  async function handleStatusChange(uniqueBusId: string, status: number) {
    try {
        setLoading(true);
        const message = await setBusStatus({
            unique_bus_id: uniqueBusId,
            status: status
        });

        setBusList(prevBuss => {
          return prevBuss.map((bus, index) => {
              if (bus === uniqueBusId) {
                  setStatus(prevStatus => {
                    return prevStatus.map((stat, statIndex) => {
                      if (statIndex === index) {
                        return status;
                      }
                      return stat;
                    });
                  });
                  return uniqueBusId;  
              }
              return bus; 
          });
        });

        setLoading(false);

        console.log(message);

    } catch (error) {
        console.error("Error updating bus status:", error);
    }
  }

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
      <HStack spacing={4} align="center" width={"100%"}>
        <Text>Unique Bus List</Text>
        <Divider orientation="vertical" />
        <Button height={"35px"} width={"50%"} onClick={() => setIsOpen(true)}>View</Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="40vw">
          <ModalHeader>Bus Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Bus Name</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr>
                    <Td colSpan={4}>
                      <Spinner />
                    </Td>
                  </Tr>
                ) : (
                  busList.map((busId, index) => (
                    <Tr key={busId}>
                      <Td>
                      <Button size={"lg"} variant="link" onClick={() => openSchedule(busId)}>
                        <AiFillPlusSquare size="1.5em" />
                      </Button>

                      </Td>
                      <Td>{busId}</Td>
                      <Td style={{ textAlign: 'center' }}>
                      {status[index] === 1 ? (
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
                        {status[index] === 1 ? (
                          <Button style={{ height: '35px', width: '100%' }} 
                          colorScheme="red" onClick={() => handleStatusChange(busId, 0)}>
                            Set Inactive
                          </Button>
                        ) : (
                          <Button style={{ height: '35px', width: '100%' }} 
                          colorScheme="green" onClick={() => handleStatusChange(busId, 1)}>
                            Set Active
                          </Button>
                        )}
                      </Td>
                    </Tr>
                    
                  ))
                )}
              </Tbody>
            </Table>

          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isScheduleOpen} onClose={closeSchedule} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent maxWidth="35vw">
          <ModalHeader>Schedule Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingSchedules ? (
              <Spinner />
            ) : (
              activeBusId &&
              schedules.map((schedule) => (
                
              <Box key={schedule.bus_schedule_id} ml={4} mt={4} p={4} borderWidth="1px" borderRadius="md">
                <Text fontWeight="bold" mb={2}>
                  Date: {new Date(schedule.schedule_date).toLocaleDateString("en-GB")}
                </Text>

                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                  <Box mt={4}>
                    <Flex direction="column" alignItems="start" mb={2}>
                      <Text fontWeight="bold" mb={1}>Source</Text>
                      <Flex alignItems="center">
                        <Box as={FaMapMarkerAlt} size="14px" color={optionColor} mr={2} />
                        <Box>
                          <Text fontSize="md" fontWeight="bold">
                            {schedule.starting_point}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>

                  <Flex alignItems="center" flexDirection="column">
                      <Box mt={4}>
                      <Text fontWeight="bold" mb={1}>Destinations</Text>
                      {schedule.destination_points.map((destination, index) => (
                      <Flex direction="column" alignItems="start" mb={2}>
                        <Flex alignItems="center">
                            {index === schedule.destination_points.length - 1 && (
                              <Box as={AiFillFlag} size="14px" color={optionColor} mr={2} />
                            )}
                            {index !== schedule.destination_points.length - 1 && (
                              <Box as={AiOutlineArrowDown} size="14px" color={optionColor} mr={2} />
                            )}                          <Box>
                            <Text fontSize="md" fontWeight="bold">
                              {destination}
                            </Text>
                          </Box>
                        </Flex>
                      </Flex>
                      ))}
                    </Box>
  
                  </Flex>

                  <Box mt={4}>
                    <Flex direction="column" alignItems="start" mb={2}>
                      <Text fontWeight="bold" mb={1}>Departure Time</Text>
                      <Flex alignItems="center">
                        <Icon as={FaClock} mr={2} />
                        <Box>
                          <Text fontSize="md" fontWeight="bold">
                          {schedule.departure_time}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                  

                  <Box mt={4}>
                    <Flex direction="column" alignItems="start" mb={2}>
                      <Text fontWeight="bold" mb={1}>Booked Count: {schedule.bookedCount}</Text>
                      <Text fontWeight="bold" mb={1}>Total Count: {schedule.totalCount}</Text>
                      
                    </Flex>
                  </Box>
                </Grid>
              </Box>
              ))
            )}
            <Box>
              <br />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Flex>
  );
}
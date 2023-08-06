// generate a simple table component in chakra ui where every row has a service name, service class, time, facilities and price with edit button  
// the table fetches data from an api endpoint

import { Box, Flex, Text, Button, Stack, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { DeleteIcon } from '@chakra-ui/icons';
import { AddIcon } from '@chakra-ui/icons';

import { get_bus_info_url } from '@public/commonData/Api';

export default function TransportTable() {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
    const [transports, setTransports] = useState([]);

    useEffect(() => {
        fetch(get_bus_info_url)
            .then(response => response.json())
            .then(data => {
                setTransports(data);
                console.log(data); // Log the fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            rounded={'lg'}
        >
            <Box
                maxW="1000px" 
                mx="8vw" 
                px={{ base: '4', md: '8' }} 
                py="12" 
            >
                <Flex
                    align="center"
                    justify="space-between"
                    flexDirection="row"
                    mb={5}
                >
                    <Text fontSize="2xl" fontWeight="bold">Transport</Text>
                    <Button
                        colorScheme="blue"
                        variant="solid"
                    >
                        Add Transport
                    </Button>
                </Flex>
                
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th textAlign={'center'}>Service Name</Th>
                            <Th textAlign={'center'}>Service Class</Th>
                            <Th textAlign={'center'}>Time</Th>
                            <Th textAlign={'center'}>Facilities</Th>
                            <Th textAlign={'center'}>Price</Th>
                            <Th colSpan={2} textAlign={'center'}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {transports.map((transport) => (
                            <Tr key={transport.id}>
                                <Td>{transport.service_name}</Td>
                                <Td>{transport.service_class}</Td>
                                <Td>{transport.time}</Td>
                                <Td>{transport.facilities.join(', ')}</Td>
                                <Td>{transport.price}</Td>
                                <Td>
                                    <Button
                                        leftIcon={<EditIcon />}
                                        colorScheme="blue"
                                        variant="solid"
                                    >
                                        Edit
                                    </Button>
                                </Td>
                                <Td>
                                    <Button
                                        leftIcon={<DeleteIcon />}
                                        colorScheme="red"
                                        variant="solid"
                                    >
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
}
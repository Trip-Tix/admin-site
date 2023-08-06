// generate filter box component in chakra ui 
// where users can select a service class, time, facilities and price to filter the transport table

import { Box, Flex, Text, Button, Stack, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export default function TransportFilterBox() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            w={'full'}
            maxW={'lg'}
            mx={'center'}
            py={2}
            px={2}  
            rounded={'lg'}
            padding={'10'}
        >
            <Flex
                align="center"
                justify="space-between"
                flexDirection="row"
                mb={5}
                
            >
                <Text fontSize="2xl" fontWeight="bold">Filter</Text>
            </Flex>
            <Stack spacing={8}>
                <Box>
                    <Text fontSize="md" fontWeight="bold">Service Class</Text>
                    <select>
                        <option value="all">All</option>
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                    </select>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="bold">Time</Text>
                    <select>
                        <option value="all">All</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </select>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="bold">Facilities</Text>
                    <select>
                        <option value="all">All</option>
                        <option value="wifi">Wifi</option>
                        <option value="food">Food</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="bold">Price</Text>
                    <select>
                        <option value="all">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </Box>
                <Button
                    colorScheme="blue"
                    variant="solid"
                >
                    Filter
                </Button>
            </Stack>
        </Box>
    );
}
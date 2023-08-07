// generate filter box component in chakra ui 
// where users can select a service class, time, facilities and price to filter the transport table

import { Box, 
    Flex, 
    Text, 
    Button, 
    Stack, 
    useColorModeValue, 
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td, 
    TableCaption,
    Input,
    Tag,
    TagLabel,
    TagCloseButton,

} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

interface TransportTableProps {
    transports: {
      id: number;
      service_name: string;
      service_class: string;
      time: string;
      facilities: string[];
      price: number;
    }[];
    setTransports: React.Dispatch<React.SetStateAction<any[]>>;
    originalTransports: {
      id: number;
      service_name: string;
      service_class: string;
      time: string;
      facilities: string[];
      price: number;
    }[];
}

export default function TransportFilterBox({ transports, setTransports, originalTransports }: TransportTableProps) {
    const [selectedServiceClass, setSelectedServiceClass] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<string[]>([]);

    const serviceClasses = transports.map((transport) => transport.service_class);
    const times = transports.map((transport) => transport.time);
    const facilities = transports.flatMap((transport) => transport.facilities);
    const prices = transports.map((transport) => transport.price);
    
    const addServiceClassTag = (serviceClass: string) => {
        if (!selectedServiceClass.includes(serviceClass)) {
            setSelectedServiceClass([...selectedServiceClass, serviceClass]);
        }
    };
    
    const removeServiceClassTag = (serviceClass: string) => {
        setSelectedServiceClass(selectedServiceClass.filter((item) => item !== serviceClass));
    };

    const addTimeTag = (time: string) => {
        if (!selectedTime.includes(time)) {
            setSelectedTime([...selectedTime, time]);
        }
    };
    
    const removeTimeTag = (time: string) => {
        setSelectedTime(selectedTime.filter((item) => item !== time));
    };



    const addFacilityTag = (facility: string) => {
        if (!selectedFacilities.includes(facility)) {
        setSelectedFacilities([...selectedFacilities, facility]);
        }
    };
    
    const removeFacilityTag = (facility: string) => {
        setSelectedFacilities(selectedFacilities.filter((item) => item !== facility));
    };

    const applyFilters = () => {
        const filteredTransports = transports.filter(transport => {
            const serviceClassMatch = selectedServiceClass.length === 0 || selectedServiceClass.includes(transport.service_class);
            const timeMatch = selectedTime.length === 0 || selectedTime.includes(transport.time);
            const facilitiesMatch = selectedFacilities.length === 0 || selectedFacilities.some(facility => transport.facilities.includes(facility));

            return serviceClassMatch && timeMatch && facilitiesMatch;
        });

        setTransports(filteredTransports);
    };

    const resetFilters = () => {
        setSelectedServiceClass([]);
        setSelectedTime([]);
        setSelectedFacilities([]);
        setSelectedPrice([]);
        setTransports(originalTransports);
    };
    
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
                <Flex flexWrap="wrap" mb={3}>
                    {selectedServiceClass.map((serviceClass) => (
                        <Tag
                            key={serviceClass}
                            size="md"
                            variant="subtle"
                            colorScheme="blue"
                            borderRadius="md"
                        >
                            <TagLabel>{serviceClass}</TagLabel>
                            <TagCloseButton onClick={() => removeServiceClassTag(serviceClass)} />
                        </Tag>
                    ))}
                    {selectedFacilities.map((facility) => (
                        <Tag
                        key={facility}
                        size="md"
                        variant="subtle"
                        colorScheme="blue"
                        borderRadius="md"
                        >
                        <TagLabel>{facility}</TagLabel>
                        <TagCloseButton onClick={() => removeFacilityTag(facility)} />
                        </Tag>
                    ))}
                    {selectedTime.map((time) => (
                        <Tag
                            key={time}
                            size="md"
                            variant="subtle"
                            colorScheme="blue"
                            borderRadius="md"
                        >
                            <TagLabel>{time}</TagLabel>
                            <TagCloseButton onClick={() => removeTimeTag(time)} />
                        </Tag>
                    ))}
                </Flex>
                <Box>
                    <Text fontSize="md" fontWeight="bold">Service Class</Text>
                    <select
                        onChange={(e) => addServiceClassTag(e.target.value)}
                        value=""
                    >
                        <option value="" disabled>
                            Select Service Class
                        </option>
                        {serviceClasses.map((serviceClass, index) => (
                            <option key={index} value={serviceClass}>
                                {serviceClass}
                            </option>
                        ))}
                    </select>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="bold">Time</Text>
                    <select
                        onChange={(e) => addTimeTag(e.target.value)}
                        value=""
                    >
                        <option value="" disabled>
                            Select Time
                        </option>
                        {times.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="bold">Facilities</Text>
                    <select
                        onChange={(e) => addFacilityTag(e.target.value)}
                        value="" // Set an empty value so that the dropdown resets after selection
                    >
                        <option value="" disabled>
                        Select Facility
                        </option>
                        {facilities.map((facility, index) => (
                        <option key={index} value={facility}>
                            {facility}
                        </option>
                        ))} 
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
                    onClick={applyFilters}
                >
                    Filter
                </Button>
                <Button
                    ml={2}
                    colorScheme="red"
                    variant="outline"
                    onClick={resetFilters}
                >
                    Reset
                </Button>
            </Stack>
        </Box>
    );
}
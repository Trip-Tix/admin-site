// generate a footer component in chakra ui

import { Box, Text, Link, Stack, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function DashboardFooter(){
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Box
                maxW="7xl"
                mx="auto"
                py="12"
                px={{ base: '4', md: '8' }}
                display={{ md: 'flex' }}
                alignItems={{ md: 'center' }}
                justifyContent={{ md: 'space-between' }}
            >
                <Text fontSize="sm">&copy; {new Date().getFullYear()} Triptix. All rights reserved.</Text>
                <Stack
                    direction={{ base: 'column-reverse', md: 'row' }}
                    spacing={{ base: '2', md: '8' }}
                    alignItems="center"
                >
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms and Conditions</Link>
                    <Link href="#">Contact Us</Link>
                </Stack>
            </Box>
        </Box>
    );
}
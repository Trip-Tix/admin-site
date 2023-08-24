import { Spinner, Text, VStack, HStack, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface ShowLayoutProps {
    coachId: number;
    brandName: string;
}

export default function ShowLayout({ coachId, brandName }: ShowLayoutProps) {
    const [layout, setLayout] = useState<number[][]>([]);
    const [existingNumber, setExistingNumber] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    // use api in later Stage using coachId and brandName
    useEffect(() => {
        setLoading(true);
        const tempLayout: number[][] = [];
        for (let i = 0; i < 4; i++) {
            const tempRow: number[] = [];
            for (let j = 0; j < 4; j++) {
                tempRow.push(i > j ? 1 : 0);
            }
            tempLayout.push(tempRow);
        }

        setLayout(tempLayout);
        setExistingNumber(4);
        setLoading(false);
    }, [coachId, brandName]);

    return (
        <>{
            loading? (
                <>
                <Text>Loading... </Text>
                <Spinner />
                </>
            ) :
            (
                <VStack>
                {layout.map((row, rowIndex) => (
                    <HStack key={rowIndex}>
                        {row.map((seat, seatIndex) => (
                            <Box
                                key={seatIndex}
                                w="10"
                                h="10"
                                bg={seat === 0 ? "red" : "green"}
                                borderRadius={10}
                            />
                        ))}
                    </HStack>
                ))}
                </VStack>
            )
        }
        </>
    );
}

import { Spinner, Text, VStack, Box, HStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { fetchBusFacilities } from "@public/common/bus_api";

interface ShowFacilitiesProps {
  coachId: number;
  brandName: string;
  facilities: string[];
  setFacilities: (facilities: string[]) => void;
}

export default function ShowFacilities({ coachId, brandName, facilities, setFacilities }: ShowFacilitiesProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const fetchedFacilities = await fetchBusFacilities(coachId, brandName);
      setFacilities(fetchedFacilities);
      setLoading(false);
    };
    fetchData();
  }, [coachId, brandName]);

  return (
    <>
      {loading ? (
        <>
          <Text>Loading... </Text>
          <Spinner />
        </>
      ) : (
        <VStack spacing={2} p={"1rem"} align="start">
          <HStack spacing={4}>
            <Text>Facilities:</Text>
            {facilities.map((facility, index) => (
              <Box key={index} p={2} borderWidth="1px" borderRadius="md">
                {facility}
              </Box>
            ))}
          </HStack>
        </VStack>
      )}
    </>
  );  
}

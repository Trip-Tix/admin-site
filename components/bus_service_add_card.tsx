import React, { useState } from "react";
import { Box, Text, Input, Button, Checkbox } from "@chakra-ui/react";

interface Coach {
  coach_id: string;
  coach_name: string;
}

interface BusServiceCardProps {
  coaches: Coach[];
  onSubmit: (serviceInfo: any) => void;
}

const BusServiceCard: React.FC<BusServiceCardProps> = ({ coaches, onSubmit }) => {
  const [serviceInfo, setServiceInfo] = useState({
    serviceName: "",
    numberOfBuses: 0,
    selectedCoaches: [] as string[],
  });

  const handleCheckboxChange = (coachId: string) => {
    const updatedSelectedCoaches = serviceInfo.selectedCoaches.includes(coachId)
      ? serviceInfo.selectedCoaches.filter((id) => id !== coachId)
      : [...serviceInfo.selectedCoaches, coachId];

    setServiceInfo({
      ...serviceInfo,
      selectedCoaches: updatedSelectedCoaches,
    });
  };

  const handleAddButtonClick = () => {
    onSubmit(serviceInfo);
  };

  return (
        <Box width="80%" display="flex">
          {/* Left side (Image) */}
          <Box flex="1" bg="#f0f0f0" backgroundImage={`url('/images/bus_add_page_pic.jpg')`} backgroundSize="cover">
          </Box>
    
          {/* Right side (Form) */}
          <Box flex="1" p={8} boxShadow="md" rounded="md" bg="white">
            <Text fontSize="xl" fontWeight="bold">
              Add New Bus Service
            </Text>
            <Box my={5} mt={10}>
              <Input
                placeholder="Service Name"
                value={serviceInfo.serviceName}
                onChange={(e) => setServiceInfo({ ...serviceInfo, serviceName: e.target.value })}
                my={4}
              />
            </Box>
            <Input
              type="number"
              placeholder="Number of Buses"
              value={serviceInfo.numberOfBuses}
              onChange={(e) => setServiceInfo({ ...serviceInfo, numberOfBuses: Number(e.target.value) })}
              my={4}
            />
            <Box my={5} mt={10}>
              <Text my={2}>Types of Coaches:</Text>
              {coaches.map((coach) => (
                  <Checkbox
                  key={coach.coach_id}
                  value={coach.coach_id}
                  isChecked={serviceInfo.selectedCoaches.includes(coach.coach_id)}
                  onChange={() => handleCheckboxChange(coach.coach_id)}
                  >
                  {coach.coach_name}
                  </Checkbox>
              ))}
            </Box>
            <br></br>
            <Button colorScheme="blue" mt={20} onClick={handleAddButtonClick}>
              Add
            </Button>
          </Box>
        </Box>
  );
};

export default BusServiceCard;

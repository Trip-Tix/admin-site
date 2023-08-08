import React, { useState } from "react";
import { Box, Text, Input, Button, Checkbox, Flex } from "@chakra-ui/react";

interface Coach {
  coach_id: string;
  coach_name: string;
}

interface BusServiceCardProps {
  coaches: Coach[];
  onSubmit: (serviceInfo: any) => void;
}

const BusServiceCard: React.FC<BusServiceCardProps> = ({
  coaches,
  onSubmit,
}) => {
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
    <Flex width="80%">
      {/* Left side (Image) */}
      <Box
        flex="1"
        bg="#f0f0f0"
        backgroundImage={`url('/images/bus_add_page_pic.jpg')`}
        backgroundSize="cover"
        borderTopLeftRadius="md" // Rounded top-left corner
        borderBottomLeftRadius="md" // Rounded bottom-left corner
      ></Box>

      {/* Right side (Form) */}
      <Box
        flex="1"
        p={8}
        boxShadow="md"
        bg="#f2f2f2"
        borderTopRightRadius="md" // Rounded top-right corner
        borderBottomRightRadius="md" // Rounded bottom-right corner
      >
        <Text fontSize="xl" fontWeight="bold">
          Add New Bus Service
        </Text>
        <Box my={5} mt={10}>
          <Input
            placeholder="Service Name"
            value={serviceInfo.serviceName}
            onChange={(e) =>
              setServiceInfo({ ...serviceInfo, serviceName: e.target.value })
            }
            my={4}
          />
        </Box>
        <Input
          type="number"
          placeholder="Number of Buses"
          value={serviceInfo.numberOfBuses}
          onChange={(e) =>
            setServiceInfo({
              ...serviceInfo,
              numberOfBuses: Number(e.target.value),
            })
          }
          my={4}
        />
        <Box my={5} mt={10}>
          <Text my={2}>Types of Coaches:</Text>
          <Flex flexWrap="wrap" gap={4}>
            {coaches.map((coach) => (
              <Checkbox
                key={coach.coach_id}
                value={coach.coach_id}
                isChecked={serviceInfo.selectedCoaches.includes(coach.coach_id)}
                onChange={() => handleCheckboxChange(coach.coach_id)}
                colorScheme="blue" // Changed checkbox color to blue
              >
                {coach.coach_name}
              </Checkbox>
            ))}
          </Flex>
        </Box>
        <br />
        <Button colorScheme="blue" mt={20} onClick={handleAddButtonClick}>
          Add Bus Service
        </Button>
      </Box>
    </Flex>
  );
};

export default BusServiceCard;

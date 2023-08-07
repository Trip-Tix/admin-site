import { Flex, Box, Image, Text, Input, Select, Button, Checkbox } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Navbar from "@components/navbar";
import { navbar_items } from "@public/commonData/AdminNavBarData";
import { get_coach_info_url, add_bus_info_url } from "@public/commonData/Api";
import Layout from "@components/layout";

interface Coach {
  coach_id: string;
  coach_name: string;
}

interface AddBusServicePageProps {
  coaches: Coach[];
}

export default function AddBusServicePage({ coaches }: AddBusServicePageProps) {
  console.log("coaches:", coaches); // Check the coaches data in the console

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
    // Make API request to add bus service
    fetch(add_bus_info_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        busName: serviceInfo.serviceName,
        numberOfBus: serviceInfo.numberOfBuses,
        coachInfo: serviceInfo.selectedCoaches,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Bus service added successfully:", data);
        // Reset form fields or navigate to a different page
      })
      .catch((error) => {
        console.error("Error adding bus service:", error);
      });
  };

  return (
    <Layout title="Add Bus Service">
      <Flex justify="center" align="center" minHeight="100vh">
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
      </Flex>
    </Layout>
  );
  
  
}

// Fetch coach information from API
export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(get_coach_info_url);
    const coachesData = await response.json();
    console.log("coachesData:", coachesData); // Check the raw data from the API

    const coaches: Coach[] = JSON.parse(coachesData); // Parse the data to an array

    return {
      props: { coaches },
    };
  } catch (error) {
    console.error("Error fetching coach information:", error);
    return {
      props: { coaches: [] },
    };
  }
}

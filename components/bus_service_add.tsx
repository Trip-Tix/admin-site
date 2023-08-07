import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  VStack,
  HStack,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import { backgroundColor, hoverColor } from "@public/commonData/CommonColor";
import { get_coach_info_url } from "@public/commonData/LocalAPI";

interface BusService {
  serviceName: string;
  serviceClasses: string[];
  amount: number;
}

const AddBusServiceForm: React.FC = () => {
  const [busService, setBusService] = useState<BusService>({
    serviceName: "",
    serviceClasses: [],
    amount: 0,
  });

  const [serviceClasses, setServiceClasses] = useState([]);

  useEffect(() => {
    fetch(get_coach_info_url)
      .then((response) => response.json())
      .then((data) => {
        setServiceClasses(data);
        console.log(data); // Log the fetched data
      })
      .catch((error) => {
        console.error("Error in fetching service data:", error);
      });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBusService((prevService) => ({ ...prevService, [name]: value }));
  };

  const handleServiceClassChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, checked } = event.target;
    if (checked) {
      setBusService((prevService) => ({
        ...prevService,
        serviceClasses: [...prevService.serviceClasses, value],
      }));
    } else {
      setBusService((prevService) => ({
        ...prevService,
        serviceClasses: prevService.serviceClasses.filter(
          (classValue) => classValue !== value,
        ),
      }));
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedAmount = parseFloat(value);
    setBusService((prevService) => ({ ...prevService, amount: parsedAmount }));
  };

  const handleAddService = () => {
    // Here you can perform database/API calls to add the bus service
    // For this example, let's just log the service data
    console.log("Adding bus service:", busService);
    if (busService.serviceClasses.length === 0) {
      // alert("Please select at least one service class");
      busService.serviceClasses = ["100", "101", "102"];
    }
    sessionStorage.setItem("selectedBusService", JSON.stringify(busService)); 
  };

  return (
    <Flex justifyContent={"center"} margin={"10"} alignItems={"center"}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={backgroundColor}
        rounded={"lg"}
        flexDirection={"column"}
        padding={"20"}
        width={"400px"}
      >
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Service Name</FormLabel>
            <Input
              type="text"
              name="serviceName"
              value={busService.serviceName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Service Class</FormLabel>
            <VStack align="start" spacing={2}>
              {serviceClasses.map((cls) => (
                <Checkbox
                  key={cls.coach_id}
                  value={cls.coach_name}
                  isChecked={busService.serviceClasses.includes(cls.coach_id)}
                  onChange={handleServiceClassChange}
                >
                  {cls.coach_name}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              name="amount"
              value={busService.amount}
              onChange={handleAmountChange}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleAddService}>
            Add Bus Service
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default AddBusServiceForm;

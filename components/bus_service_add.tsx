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
  serviceClasses: ServiceClass[];
  amount: number;
}

interface ServiceClass {
  classNumber: number;
  className: string;
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

    const foundCoach = serviceClasses.find(
      (coach) => coach.coach_name === value,
    );

    if (checked) {
      const newServiceClass: ServiceClass = {
        classNumber: foundCoach.coach_id,
        className: value, // Replace this with the appropriate class name
      };

      setBusService((prevService) => ({
        ...prevService,
        serviceClasses: [...prevService.serviceClasses, newServiceClass],
      }));
    } else {
      setBusService((prevService) => ({
        ...prevService,
        serviceClasses: prevService.serviceClasses.filter(
          (classValue) => classValue.classNumber !== parseInt(value),
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
    if (busService.serviceClasses.length === 0) {
      alert("Please select at least one service class");
      return;
    }
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

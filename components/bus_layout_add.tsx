import { Box } from "@chakra-ui/react";

// Retrieve BusService objects from sessionStorage
const busServices = JSON.parse(sessionStorage.getItem("busServices")) || [];

export default function BusLayoutAdd() {
  return (
    <div>
      {busServices.map((busService, index) => (
        <div key={index}>
          <h2>{busService.serviceName}</h2>
          {busService.serviceClasses.map((serviceClass, classIndex) => (
            <Box key={classIndex} borderWidth="1px" p={4} my={2}>
              {serviceClass}
            </Box>
          ))}
        </div>
      ))}
    </div>
  );
}


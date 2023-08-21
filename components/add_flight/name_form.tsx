import {
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { getFlightNames } from "@public/common/api";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AiOutlineStar } from "react-icons/ai";
import { FlightAddContext } from "@public/common/context";

export default function NameForm() {
  const [flightNames, setFlightNames] = useState<string[]>([]);
  const [userToken, setUserToken] = useState<string>("");
  const { flightName, setFlightName } = useContext(FlightAddContext);
  const [filteredFlightNames, setFilteredFlightNames] = useState<string[]>([]);
  const [isFlightNameNew, setIsFlightNameNew] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(getFlightNames, null, {
          headers: {
            usertoken: userToken,
          },
        });
        if (response.status === 200) {
          setFlightNames(response.data);
        } else {
          console.error("Failed to fetch flight names", "component/add_flight/name_form.tsx");
        }
      } catch (error) {
        console.error("An error occurred while fetching flight names:", error, "component/add_flight/name_form.tsx");
      }
    };
    fetchData();
  }, [userToken]);

  useEffect(() => {
    const filteredFlightNames = flightNames.filter((name) =>
      name.toLowerCase().includes(flightName.toLowerCase()),
    );
    setFilteredFlightNames(filteredFlightNames);
  }, [flightName, flightNames]);

  useEffect(() => {
    setIsFlightNameNew(!flightNames.includes(flightName));
  }, [flightName, flightNames]);

  return (
    <FormControl>
      <FormLabel>Flight Name</FormLabel>
      <InputGroup>
        <Input onChange={(e) => setFlightName(e.target.value)} value={flightName} />
        <InputRightElement>
          {isFlightNameNew && <AiOutlineStar />}
        </InputRightElement>
      </InputGroup>
      {filteredFlightNames.length > 0 && flightName.length > 0 && isFlightNameNew && (
        <List
          spacing={3}
          mt={3}
          borderRadius={5}
          bg={useColorModeValue("gray.300", "gray.700")}
        >
          {filteredFlightNames.map((name) => (
            <ListItem
              key={name}
              onClick={() => setFlightName(name)}
              tabIndex={0}
              role="button"
              _hover={{
                cursor: "pointer",
                bg: useColorModeValue("gray.400", "gray.600"),
              }}
              p={3}
              borderRadius={5}
            >
              {name}
            </ListItem>
          ))}
        </List>
      )}
    </FormControl>
  );
}

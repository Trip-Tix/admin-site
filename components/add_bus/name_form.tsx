import {
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { getBusNames } from "@public/common/api";
import axios from "axios";
import { useState, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AiOutlineStar } from "react-icons/ai";

export default function NameForm() {
  const [busNames, setBusNames] = useState<string[]>([]);
  const [userToken, setUserToken] = useState<string>("");
  const [busName, setBusName] = useState<string>("");
  const [filteredBusNames, setFilteredBusNames] = useState<string[]>([]);
  const [isBusNameNew, setIsBusNameNew] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(getBusNames, null, {
          headers: {
            usertoken: userToken,
          },
        });
        if (response.status === 200) {
          setBusNames(response.data);
        } else {
          console.error(
            "Failed to fetch bus names",
            "component/list_bus/bus_tag.tsx",
          );
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching bus names:",
          error,
          "component/list_bus/bus_tag.tsx",
        );
      }
    };
    fetchData();
  }, [userToken]);

  useEffect(() => {
    const filteredBusNames = busNames.filter((name) =>
      name.toLowerCase().includes(busName.toLowerCase()),
    );
    setFilteredBusNames(filteredBusNames);
  }, [busName, busNames]);

  useEffect(() => {
    setIsBusNameNew(!busNames.includes(busName));
  }, [busName, busNames]);

  return (
    <FormControl>
      <FormLabel>Bus Name</FormLabel>
      <InputGroup>
        <Input onChange={(e) => setBusName(e.target.value)} value={busName} />
        <InputRightElement>
          {isBusNameNew && <AiOutlineStar />}
        </InputRightElement>
      </InputGroup>
      {filteredBusNames.length > 0 && busName.length > 0 && isBusNameNew && (
        <List
          spacing={3}
          mt={3}
          borderRadius={5}
          bg={useColorModeValue("gray.300", "gray.700")}
        >
          {filteredBusNames.map((name) => (
            <ListItem
              key={name}
              onClick={() => setBusName(name)}
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

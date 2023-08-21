import {
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { getTrainNames } from "@public/common/api";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AiOutlineStar } from "react-icons/ai";
import { TrainAddContext } from "@public/common/context";

export default function NameForm() {
  const [trainNames, setTrainNames] = useState<string[]>([]);
  const [userToken, setUserToken] = useState<string>("");
  const { trainName, setTrainName } = useContext(TrainAddContext);
  const [filteredTrainNames, setFilteredTrainNames] = useState<string[]>([]);
  const [isTrainNameNew, setIsTrainNameNew] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setUserToken(sessionStorage.getItem("user-token") || "");
      try {
        const response = await axios.post(getTrainNames, null, {
          headers: {
            usertoken: userToken,
          },
        });
        if (response.status === 200) {
          setTrainNames(response.data);
        } else {
          console.error("Failed to fetch train names", "component/add_train/name_form.tsx");
        }
      } catch (error) {
        console.error("An error occurred while fetching train names:", error, "component/add_train/name_form.tsx");
      }
    };
    fetchData();
  }, [userToken]);

  useEffect(() => {
    const filteredTrainNames = trainNames.filter((name) =>
      name.toLowerCase().includes(trainName.toLowerCase()),
    );
    setFilteredTrainNames(filteredTrainNames);
  }, [trainName, trainNames]);

  useEffect(() => {
    setIsTrainNameNew(!trainNames.includes(trainName));
  }, [trainName, trainNames]);

  return (
    <FormControl>
      <FormLabel>Train Name</FormLabel>
      <InputGroup>
        <Input onChange={(e) => setTrainName(e.target.value)} value={trainName} />
        <InputRightElement>
          {isTrainNameNew && <AiOutlineStar />}
        </InputRightElement>
      </InputGroup>
      {filteredTrainNames.length > 0 && trainName.length > 0 && isTrainNameNew && (
        <List
          spacing={3}
          mt={3}
          borderRadius={5}
          bg={useColorModeValue("gray.300", "gray.700")}
        >
          {filteredTrainNames.map((name) => (
            <ListItem
              key={name}
              onClick={() => setTrainName(name)}
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

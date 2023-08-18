import { useState } from "react";
import {
  Input,
  List,
  ListItem,
  FormControl,
  FormLabel,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { BsBox } from "react-icons/bs";
import { useColorModeValue } from "@chakra-ui/react";

const suggestions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna"];

interface Props {
  label: string;
}

const AutoSuggestSelect = ({ label }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = suggestions.filter((suggest) =>
      suggest.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <HStack align={"baseline"}>
      <FormLabel>{label}</FormLabel>
      <VStack spacing="0" align={"stretch"} w="100%">
        <Input
          placeholder="Type to search..."
          value={inputValue}
          onChange={handleInputChange}
        />

        {filteredSuggestions.length > 0 && (
          <List
            w="100%"
            bg={useColorModeValue("gray.200", "gray.700")}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="md"
            
          >
            {filteredSuggestions.map((suggestion, index) => (
              <ListItem
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                cursor="pointer"
                _hover={{ background:useColorModeValue("gray.400", "gray.500") }}
                p={2}
                overflow={"overlay"}
              >
                {suggestion}
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </HStack>
  );
};

export default AutoSuggestSelect;

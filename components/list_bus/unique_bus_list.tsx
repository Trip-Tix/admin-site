import { fetchAllUniqueBusId } from "@public/common/bus_api";
import { useState, useEffect } from "react";
import {
  Flex,
  useColorModeValue,
  Spinner,
  List,
  ListItem,
  Text,
  Divider,
} from "@chakra-ui/react";

interface BusIdProps {
  coachId: number;
  brandName: string;
}

export default function UniqueBusList({ coachId, brandName }: BusIdProps) {
  const [busList, setBusList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchAllUniqueBusId({ coachId, brandName }).then((res) => {
      setBusList(res);
      setLoading(false);
    });
  }, [coachId, brandName]);

  useEffect(() => {
    console.log(busList);
  }, [busList]);

  return (
    <Flex
      direction="column"
      align="stretch"
      width={"100%"}
      background={useColorModeValue("gray.100", "gray.700")}
      borderRadius="0.5rem"
      padding={4}
      boxShadow="md"
    >
      <Text>Unique Bus List</Text>
      <Divider />
      <List spacing={2} mt={2}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {busList.map((busId) => (
              <ListItem key={busId}>{busId}</ListItem>
            ))}
          </>
        )}
      </List>
    </Flex>
  );
}

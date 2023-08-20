import {
  Flex,
  Text,
  VStack,
  Divider,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTrainRoute } from "@public/common/api";
import RouteItem from "@components/list_train/route_item";

type Route = {
  start: string;
  end: string[];
  amount: number;
};

interface RouteListProps {
  trainId: string;
  coachId: string;
}

export default function RouteList({ trainId, coachId }: RouteListProps) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [userToken, setUserToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setUserToken(sessionStorage.getItem("user-token") || "");
      setLoading(true);
      try {
        const response = await axios.post<Route[]>(
          getTrainRoute,
          {
            trainId: trainId,
            coachId: coachId,
          },
          {
            headers: {
              usertoken: userToken,
            },
          },
        );

        if (response.status === 200) {
          setRoutes(response.data);
        } else {
          console.error(
            response.status,
            response.data,
            "component/list_train/details/RouteList.tsx",
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [trainId, coachId, userToken]);

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
      <Text mb={1}>On Routes</Text>
      <Divider />
      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing={1} align="stretch" pt={2}>
          {routes.map((route) => (
            <RouteItem
              key={route.start + route.end[0] + route.amount}
              from={route.start}
              to={route.end}
              amount={route.amount}
            />
          ))}
        </VStack>
      )}
    </Flex>
  );
}

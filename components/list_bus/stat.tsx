import StatCard from "@components/list_bus/stat_card";
import { HStack } from "@chakra-ui/react";
import {
  getAvailableBus,
  getCustomerRating,
  getTotalRoute,
  getTotalOnRoutes,
} from "@public/common/api";

const data = [
  {
    title: "Available Bus",
    apiLink: getAvailableBus,
    cardImage: "/images/bus_available.svg"
  },
  {
    title: "Total Route",
    apiLink: getTotalRoute,
    cardImage: "/images/route.svg"
  },
  {
    title: "Total On Route",
    apiLink: getTotalOnRoutes,
    cardImage: "/images/route_total.svg"
  },
  {
    title: "Customer Rating",
    apiLink: getCustomerRating,
    cardImage: "/images/rating.svg"
  },
];

export default function Stat() {
  return (
    <HStack
      spacing="4"
      align="stretch"
      justify="space-between"
      display={{ base: "none", md: "flex" }}
    >
        {data.map((item) => (
            <StatCard key={item.title} cardTitle={item.title} apiLink={item.apiLink} cardImage={item.cardImage}/>
        ))}
    </HStack>
  );
}

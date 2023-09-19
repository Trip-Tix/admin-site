import StatCard from "@components/stat_card";
import { HStack } from "@chakra-ui/react";
import {
  getAvailableFlight,
  getCustomerRatingFlight,
  getTotalRouteFlight,
  getTotalOnRoutesFlight,
} from "@public/common/api";


const data = [
  {
    title: "Total Flight",
    apiLink: getAvailableFlight,
    cardImage: "/images/flight_available.svg"
  },
  {
    title: "Total Route",
    apiLink: getTotalRouteFlight,
    cardImage: "/images/route.svg"
  },
  {
    title: "Total On Route",
    apiLink: getTotalOnRoutesFlight,
    cardImage: "/images/route_total.svg"
  },
  {
    title: "Customer Rating",
    apiLink: getCustomerRatingFlight,
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

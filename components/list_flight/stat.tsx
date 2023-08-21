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
    title: "Available Flights",
    apiLink: getAvailableFlight,
    cardImage: "/images/flight_available.svg"
  },
  {
    title: "Total Routes",
    apiLink: getTotalRouteFlight,
    cardImage: "/images/route.svg"
  },
  {
    title: "Total On Routes",
    apiLink: getTotalOnRoutesFlight,
    cardImage: "/images/route_total.svg"
  },
  {
    title: "Customer Rating",
    apiLink: getCustomerRatingFlight,
    cardImage: "/images/rating.svg"
  },
];

export default function FlightStat() {
  return (
    <HStack
      spacing="4"
      align="stretch"
      justify="space-between"
      display={{ base: "none", md: "flex" }}
    >
      {data.map((item) => (
        <StatCard
          key={item.title}
          cardTitle={item.title}
          apiLink={item.apiLink}
          cardImage={item.cardImage}
        />
      ))}
    </HStack>
  );
}

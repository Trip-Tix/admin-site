import StatCard from "@components/stat_card";
import { HStack } from "@chakra-ui/react";
import {
  getAvailableBus,
  getCustomerRatingBus,
  getTotalRouteBus,
  getTotalOnRoutesBus,
} from "@public/common/api";

import { getAllUniqueBusCount } from "@public/common/bus_api";

const data = [
  {
    title: "Total Bus",
    apiLink: getAllUniqueBusCount,
    cardImage: "/images/bus_available.svg"
  },
  {
    title: "Total Route",
    apiLink: getTotalRouteBus,
    cardImage: "/images/route.svg"
  },
  {
    title: "Total On Route",
    apiLink: getTotalOnRoutesBus,
    cardImage: "/images/route_total.svg"
  },
  {
    title: "Customer Rating",
    apiLink: getCustomerRatingBus,
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

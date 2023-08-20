import StatCard from "@components/stat_card";
import { HStack } from "@chakra-ui/react";
import {
  getAvailableTrain,
  getCustomerRatingTrain,
  getTotalRouteTrain,
  getTotalOnRoutesTrain,
} from "@public/common/api";

const data = [
  {
    title: "Available Train",
    apiLink: getAvailableTrain,
    cardImage: "/images/train_available.svg"
  },
  {
    title: "Total Route",
    apiLink: getTotalRouteTrain,
    cardImage: "/images/route.svg"
  },
  {
    title: "Total On Route",
    apiLink: getTotalOnRoutesTrain,
    cardImage: "/images/route_total.svg"
  },
  {
    title: "Customer Rating",
    apiLink: getCustomerRatingTrain,
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

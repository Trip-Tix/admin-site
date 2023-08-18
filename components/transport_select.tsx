import { Flex, HStack, IconButton } from "@chakra-ui/react";
import {
  BsFillBusFrontFill,
  BsFillTrainFrontFill,
  BsFillAirplaneFill,
} from "react-icons/bs";
import { IconType } from "react-icons";
import {
  TransportType,
  NavigationOption,
} from "@public/common/navigation_option";
import {
  login_url,
  logout_url,
  home_url,
  list_url,
  list_bus_url,
  list_train_url,
  list_flight_url,
  add_url,
  add_bus_url,
  add_train_url,
  add_flight_url,
  schedule_url,
  schedule_bus_url,
  schedule_train_url,
  schedule_flight_url,
} from "@public/common/pagelinks";
import { useRouter } from "next/router";
import React from "react";

interface TransportItem {
  name: string;
  icon: IconType;
  link: string;
}

const bus_map = new Map<NavigationOption, string>([
  [NavigationOption.List, list_bus_url],
  [NavigationOption.Add, add_bus_url],
  [NavigationOption.Schedule, schedule_bus_url],
]);

const train_map = new Map<NavigationOption, string>([
  [NavigationOption.List, list_train_url],
  [NavigationOption.Add, add_train_url],
  [NavigationOption.Schedule, schedule_train_url],
]);

const flight_map = new Map<NavigationOption, string>([
  [NavigationOption.List, list_flight_url],
  [NavigationOption.Add, add_flight_url],
  [NavigationOption.Schedule, schedule_flight_url],
]);

interface TransportSelectProps {
  transport: TransportType;
  navigation: NavigationOption;
}

export default function TransportSelect({
  transport,
  navigation,
}: TransportSelectProps) {
  const TransportItems: Array<TransportItem> = [
    { name: "Bus", icon: BsFillBusFrontFill, link: bus_map.get(navigation) },
    {
      name: "Train",
      icon: BsFillTrainFrontFill,
      link: train_map.get(navigation),
    },
    {
      name: "Flight",
      icon: BsFillAirplaneFill,
      link: flight_map.get(navigation),
    },
  ];
  const router = useRouter();
  const handleClick = (link: string) => {
    router.push(link);
  };
  return (
    <Flex justifyContent="center" alignItems="center">
      {TransportItems.map((item) => (
        <IconButton
          key={item.name}
          isRound={true}
          variant="solid"
          colorScheme={
            transport === item.name ?
              "blue" :
              "gray"
          }
          aria-label={item.name}
          fontSize="20px"
          icon={React.createElement(item.icon)}
          m={4}
          onClick={() => handleClick(item.link)}
        />
      ))}
    </Flex>
  );
}

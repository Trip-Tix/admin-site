import { Flex, IconButton, useToast } from "@chakra-ui/react";
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
  list_bus_url,
  list_train_url,
  list_flight_url,
  add_bus_url,
  add_train_url,
  add_flight_url,
  schedule_bus_url,
  schedule_train_url,
  schedule_flight_url,
} from "@public/common/pagelinks";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

interface TransportItem {
  name: string;
  icon: IconType;
  link: string;
  permission: boolean;
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
  const router = useRouter();
  const toast = useToast();

  const [isBus, setIsBus] = useState<boolean>(false);
  const [isTrain, setIsTrain] = useState<boolean>(false);
  const [isFlight, setIsFlight] = useState<boolean>(false);

  useEffect(() => {
    const adminRole = sessionStorage.getItem("user-role");
    if (adminRole === "ADMIN") {
      setIsBus(true);
      setIsTrain(true);
      setIsFlight(true);
    }
    else if (adminRole === "BUS") {
      setIsBus(true);
    } else if (adminRole === "TRAIN") {
      setIsTrain(true);
    } else if (adminRole === "AIR") {
      setIsFlight(true);
    }
  }, []);

  const TransportItems: Array<TransportItem> = [
    { name: "BUS", icon: BsFillBusFrontFill, link: bus_map.get(navigation), permission: isBus },
    {
      name: "TRAIN",
      icon: BsFillTrainFrontFill,
      link: train_map.get(navigation),
      permission: isTrain,
    },
    {
      name: "FLIGHT",
      icon: BsFillAirplaneFill,
      link: flight_map.get(navigation),
      permission: isFlight,
    },
  ];


  const handleClick = (link: string, permission: boolean) => {
    if (!permission) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to access this page",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      return;
    }
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
          onClick={() => handleClick(item.link, item.permission)}
        />
      ))}
    </Flex>
  );
}

import {
  Button,
  VStack,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import Layout from "@components/layout";
import SidebarWithHeader from "@components/sidebar_with_header";
import TransportSelect from "@components/transport_select";
import {
  NavigationOption,
  TransportType,
} from "@public/common/navigation_option";
import { useState, useEffect } from "react";

import { class_interface } from "@public/common/flight_interfaces";
import ClassCard from "@components/add_flight/class_card";

import { fetchClassList } from "@public/common/flight_api";

export default function Main() {
  // Flight Card Addition, Removal and Validation
  interface flightKeyItem {
    flightKey: string;
    isValid: boolean;
  }

  const [flightKeys, setFlightKeys] = useState<flightKeyItem[]>([]);
  const [newId, setNewId] = useState<number>(0);

  const addNewFlight = () => {
    setFlightKeys([...flightKeys, { flightKey: `Flight ${newId}`, isValid: true }]);
    setNewId(newId + 1);
  };

  const removeFlight = (key: string) => {
    setFlightKeys(flightKeys.filter((item) => item.flightKey !== key));
  };

  const validateFlight = (key: string, isValid: boolean) => {
    setFlightKeys(
      flightKeys.map((item) => {
        if (item.flightKey === key) {
          return { flightKey: key, isValid: isValid };
        } else {
          return item;
        }
      }),
    );
  };

  // flight Cards need pre-fetched class list
  const [classList, setClassList] = useState<class_interface[]>([]);
  const [classListLoading, setClassListLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setClassListLoading(true);
      const classes = await fetchClassList();
      setClassList(classes);
      setClassListLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(classList);
  }, [classList]);

  // Button for submitting
  const [submit, setSubmit] = useState<boolean>(false);

  return (
    <Layout title="Add Flight" isProtected={true}>
      <SidebarWithHeader navItem={NavigationOption.Add}>
        <VStack spacing="4" align="stretch">
          <TransportSelect
            transport={TransportType.Flight}
            navigation={NavigationOption.Add}
          />
          {classListLoading ? (
            <Stack>
              <Skeleton height="10vh" />
              <Skeleton height="10vh" />
            </Stack>
          ) : (
            <VStack>
              {flightKeys.map((item) => (
                <ClassCard
                  key={item.flightKey}
                  removalAction={{
                    key: item.flightKey,
                    removeClass: removeFlight,
                    validateClass: validateFlight,
                  }}
                  classList={classList}
                  submit={submit}
                />
              ))}
              <Button onClick={addNewFlight}> Add Flight </Button>
              <Button
                colorScheme="blue"
                onClick={() => setSubmit(true)}
                isDisabled={
                  flightKeys.length === 0 /* if no card */ ||
                  flightKeys.some((item) => !item.isValid) /* if some card has invalid values */
                }
              >
                {"Submit"}
              </Button>
            </VStack>
          )}
        </VStack>
      </SidebarWithHeader>
    </Layout>
  );
}
